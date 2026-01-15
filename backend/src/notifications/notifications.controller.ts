import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

type AuthRequest = {
  user?: {
    userId: string;
  };
};

@Controller('notifications')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @Permissions('notifications.read')
  async list(@Req() req: AuthRequest) {
    return this.notificationsService.listForUser(req.user?.userId ?? '');
  }

  @Post(':id/read')
  @Permissions('notifications.update')
  async markRead(@Req() req: AuthRequest, @Param('id') id: string) {
    await this.notificationsService.markRead(req.user?.userId ?? '', id);
    return { success: true };
  }

  @Post('read-all')
  @Permissions('notifications.update')
  async markAllRead(@Req() req: AuthRequest) {
    await this.notificationsService.markAllRead(req.user?.userId ?? '');
    return { success: true };
  }
}
