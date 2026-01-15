import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { Collaborator } from '../collaborators/collaborator.entity';
import { User } from '../users/user.entity';
export declare class NotificationsService {
    private readonly notificationsRepo;
    private readonly collaboratorsRepo;
    private readonly usersRepo;
    constructor(notificationsRepo: Repository<Notification>, collaboratorsRepo: Repository<Collaborator>, usersRepo: Repository<User>);
    listForUser(userId: string): Promise<Notification[]>;
    markRead(userId: string, notificationId: string): Promise<void>;
    markAllRead(userId: string): Promise<void>;
    private syncSystemNotifications;
    private upsertCountNotification;
}
