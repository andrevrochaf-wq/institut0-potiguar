import { NotificationsService } from './notifications.service';
type AuthRequest = {
    user?: {
        userId: string;
    };
};
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    list(req: AuthRequest): Promise<import("./notification.entity").Notification[]>;
    markRead(req: AuthRequest, id: string): Promise<{
        success: boolean;
    }>;
    markAllRead(req: AuthRequest): Promise<{
        success: boolean;
    }>;
}
export {};
