import { User } from '../users/user.entity';
export declare class Notification {
    id: string;
    userId: string | null;
    user: User;
    type: string;
    title: string;
    message: string;
    meta: Record<string, unknown> | null;
    readAt: Date | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
