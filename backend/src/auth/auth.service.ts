import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { PasswordResetToken } from './password-reset-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(PasswordResetToken)
    private readonly resetTokenRepo: Repository<PasswordResetToken>,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmailWithRoles(email);
    if (!user || !user.active) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    await this.usersService.setLastLogin(user.id);
    return user;
  }

  async login(user: User) {
    const roles = user.roles?.map((role) => role.name) ?? [];
    const permissions = [
      ...new Set(
        (user.roles ?? [])
          .flatMap((role) => role.permissions ?? [])
          .map((permission) => permission.key),
      ),
    ];
    const payload = { sub: user.id, roles, permissions, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        primaryRole: user.primaryRole,
        roles,
        permissions,
      },
    };
  }

  async register(data: { email: string; fullName: string; password: string }) {
    const user = await this.usersService.createUser({
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      primaryRole: 'ADMIN',
    });
    return { id: user.id };
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.active) {
      return { sent: true };
    }

    await this.resetTokenRepo
      .createQueryBuilder()
      .update()
      .set({ usedAt: new Date() })
      .where('user_id = :userId', { userId: user.id })
      .andWhere('used_at IS NULL')
      .execute();

    const token = randomBytes(24).toString('hex');
    const expiresInSeconds = Number(this.configService.get<string>('RESET_TOKEN_EXPIRES_IN')) || 3600;
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    await this.resetTokenRepo.save(
      this.resetTokenRepo.create({
        userId: user.id,
        token,
        expiresAt,
      }),
    );

    const baseUrl = this.configService.get<string>('RESET_BASE_URL') ?? '';
    const resetUrl = baseUrl ? `${baseUrl}/redefinir-senha?token=${token}` : undefined;
    const exposeToken = this.configService.get<string>('RESET_TOKEN_EXPOSE') === 'true';

    return {
      sent: true,
      resetUrl: exposeToken ? resetUrl : undefined,
      token: exposeToken ? token : undefined,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const resetEntry = await this.resetTokenRepo.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!resetEntry || resetEntry.usedAt || resetEntry.expiresAt < new Date()) {
      throw new BadRequestException('Token invalido ou expirado.');
    }

    await this.usersService.updatePassword(resetEntry.userId, newPassword);
    resetEntry.usedAt = new Date();
    await this.resetTokenRepo.save(resetEntry);

    return { reset: true };
  }
}
