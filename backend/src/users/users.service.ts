import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { Role } from './role.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepo: Repository<Role>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findByEmailWithRoles(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email }, relations: ['roles', 'roles.permissions'] });
  }

  async setLastLogin(userId: string): Promise<void> {
    await this.usersRepo.update(userId, { lastLoginAt: new Date() });
  }

  async listUsers(): Promise<User[]> {
    return this.usersRepo.find({ order: { createdAt: 'DESC' } });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({
      email: dto.email,
      fullName: dto.fullName,
      passwordHash,
      primaryRole: dto.primaryRole ?? null,
      active: true,
    });

    const saved = await this.usersRepo.save(user);
    if (dto.primaryRole) {
      await this.assignRole(saved.id, dto.primaryRole);
    }
    return saved;
  }

  async assignRole(userId: string, roleName: string): Promise<void> {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      return;
    }

    const role = await this.rolesRepo.findOne({ where: { name: roleName } });
    if (!role) {
      return;
    }

    user.roles = [...(user.roles ?? []), role];
    await this.usersRepo.save(user);
  }

  async deactivate(userId: string): Promise<void> {
    await this.usersRepo.update(userId, { active: false });
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    const passwordHash = await bcrypt.hash(password, 10);
    await this.usersRepo.update(userId, { passwordHash });
  }
}
