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
exports.AgendaController = void 0;
const common_1 = require("@nestjs/common");
const agenda_service_1 = require("./agenda.service");
const create_agenda_dto_1 = require("./dto/create-agenda.dto");
const update_agenda_dto_1 = require("./dto/update-agenda.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let AgendaController = class AgendaController {
    agendaService;
    constructor(agendaService) {
        this.agendaService = agendaService;
    }
    async create(body) {
        return this.agendaService.create(body);
    }
    async findAll() {
        return this.agendaService.findAll();
    }
    async findOne(id) {
        return this.agendaService.findOne(id);
    }
    async update(id, body) {
        return this.agendaService.update(id, body);
    }
    async remove(id) {
        await this.agendaService.remove(id);
        return { status: 'ok' };
    }
};
exports.AgendaController = AgendaController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)('agenda.create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agenda_dto_1.CreateAgendaDto]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('agenda.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('agenda.read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)('agenda.update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_agenda_dto_1.UpdateAgendaDto]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.Permissions)('agenda.delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "remove", null);
exports.AgendaController = AgendaController = __decorate([
    (0, common_1.Controller)('agenda'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [agenda_service_1.AgendaService])
], AgendaController);
//# sourceMappingURL=agenda.controller.js.map