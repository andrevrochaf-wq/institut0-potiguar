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
exports.CollaboratorsController = void 0;
const common_1 = require("@nestjs/common");
const create_collaborator_dto_1 = require("./dto/create-collaborator.dto");
const update_collaborator_dto_1 = require("./dto/update-collaborator.dto");
const collaborators_service_1 = require("./collaborators.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let CollaboratorsController = class CollaboratorsController {
    collaboratorsService;
    constructor(collaboratorsService) {
        this.collaboratorsService = collaboratorsService;
    }
    async create(body) {
        return this.collaboratorsService.create(body);
    }
    async findAll(search, status) {
        return this.collaboratorsService.findAll({ search, status });
    }
    async findOne(id) {
        return this.collaboratorsService.findOne(id);
    }
    async update(id, body) {
        return this.collaboratorsService.update(id, body);
    }
    async deactivate(id) {
        await this.collaboratorsService.deactivate(id);
        return { status: 'ok' };
    }
};
exports.CollaboratorsController = CollaboratorsController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)('colaboradores.create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_collaborator_dto_1.CreateCollaboratorDto]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('colaboradores.read'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('colaboradores.read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)('colaboradores.update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_collaborator_dto_1.UpdateCollaboratorDto]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.Permissions)('colaboradores.delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "deactivate", null);
exports.CollaboratorsController = CollaboratorsController = __decorate([
    (0, common_1.Controller)('collaborators'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [collaborators_service_1.CollaboratorsService])
], CollaboratorsController);
//# sourceMappingURL=collaborators.controller.js.map