import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
}
