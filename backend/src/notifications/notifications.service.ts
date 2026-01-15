import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { Collaborator } from '../collaborators/collaborator.entity';
import { User } from '../users/user.entity';

type SystemNotificationSeed = {
  type: string;
  title: string;
  message: string;
  count: number;
  severity: 'warning' | 'info';
};

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepo: Repository<Notification>,
    @InjectRepository(Collaborator)
    private readonly collaboratorsRepo: Repository<Collaborator>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async listForUser(userId: string) {
    await this.syncSystemNotifications(userId);
    return this.notificationsRepo.find({
      where: { userId, active: true },
      order: { createdAt: 'DESC' },
    });
  }

  async markRead(userId: string, notificationId: string) {
    await this.notificationsRepo.update(
      { id: notificationId, userId },
      { readAt: new Date() },
    );
  }

  async markAllRead(userId: string) {
    await this.notificationsRepo
      .createQueryBuilder()
      .update(Notification)
      .set({ readAt: () => 'now()' })
      .where('user_id = :userId', { userId })
      .andWhere('active = true')
      .execute();
  }

  private async syncSystemNotifications(userId: string) {
    const [inactiveCollaborators, inactiveUsers] = await Promise.all([
      this.collaboratorsRepo.count({ where: { status: 'inactive' } }),
      this.usersRepo.count({ where: { active: false } }),
    ]);

    const seeds: SystemNotificationSeed[] = [
      {
        type: 'inactive_collaborators',
        title: 'Funcionarios Inativos',
        message: `${inactiveCollaborators} funcionarios estao inativos`,
        count: inactiveCollaborators,
        severity: 'warning',
      },
      {
        type: 'inactive_users',
        title: 'Usuarios Inativos',
        message: `${inactiveUsers} usuarios estao inativos`,
        count: inactiveUsers,
        severity: 'info',
      },
    ];

    await Promise.all(seeds.map((seed) => this.upsertCountNotification(userId, seed)));
  }

  private async upsertCountNotification(userId: string, seed: SystemNotificationSeed) {
    const existing = await this.notificationsRepo.findOne({ where: { userId, type: seed.type } });

    if (seed.count === 0) {
      if (existing) {
        existing.active = false;
        existing.message = seed.message;
        existing.meta = { count: seed.count, severity: seed.severity };
        if (!existing.readAt) {
          existing.readAt = new Date();
        }
        await this.notificationsRepo.save(existing);
      }
      return;
    }

    if (existing) {
      const existingCount = (existing.meta as { count?: number } | null)?.count ?? null;
      const changed = existingCount !== seed.count;
      existing.active = true;
      existing.title = seed.title;
      existing.message = seed.message;
      existing.meta = { count: seed.count, severity: seed.severity };
      if (changed) {
        existing.readAt = null;
      }
      await this.notificationsRepo.save(existing);
      return;
    }

    const notification = this.notificationsRepo.create({
      userId,
      type: seed.type,
      title: seed.title,
      message: seed.message,
      meta: { count: seed.count, severity: seed.severity },
      readAt: null,
      active: true,
    });
    await this.notificationsRepo.save(notification);
  }
}
