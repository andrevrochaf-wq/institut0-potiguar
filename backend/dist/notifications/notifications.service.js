"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./notification.entity");
const collaborator_entity_1 = require("../collaborators/collaborator.entity");
const user_entity_1 = require("../users/user.entity");
let NotificationsService = class NotificationsService {
    notificationsRepo;
    collaboratorsRepo;
    usersRepo;
    constructor(notificationsRepo, collaboratorsRepo, usersRepo) {
        this.notificationsRepo = notificationsRepo;
        this.collaboratorsRepo = collaboratorsRepo;
        this.usersRepo = usersRepo;
    }
    async listForUser(userId) {
        await this.syncSystemNotifications(userId);
        return this.notificationsRepo.find({
            where: { userId, active: true },
            order: { createdAt: 'DESC' },
        });
    }
    async markRead(userId, notificationId) {
        await this.notificationsRepo.update({ id: notificationId, userId }, { readAt: new Date() });
    }
    async markAllRead(userId) {
        await this.notificationsRepo
            .createQueryBuilder()
            .update(notification_entity_1.Notification)
            .set({ readAt: () => 'now()' })
            .where('user_id = :userId', { userId })
            .andWhere('active = true')
            .execute();
    }
    async syncSystemNotifications(userId) {
        const [inactiveCollaborators, inactiveUsers] = await Promise.all([
            this.collaboratorsRepo.count({ where: { status: 'inactive' } }),
            this.usersRepo.count({ where: { active: false } }),
        ]);
        const seeds = [
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
    async upsertCountNotification(userId, seed) {
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
            const existingCount = existing.meta?.count ?? null;
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
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(1, (0, typeorm_1.InjectRepository)(collaborator_entity_1.Collaborator)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map