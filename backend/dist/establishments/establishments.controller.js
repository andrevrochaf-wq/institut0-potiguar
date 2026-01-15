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
exports.EstablishmentsController = void 0;
const common_1 = require("@nestjs/common");
const establishments_service_1 = require("./establishments.service");
const create_establishment_dto_1 = require("./dto/create-establishment.dto");
const update_establishment_dto_1 = require("./dto/update-establishment.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let EstablishmentsController = class EstablishmentsController {
    establishmentsService;
    constructor(establishmentsService) {
        this.establishmentsService = establishmentsService;
    }
    async create(body) {
        return this.establishmentsService.create(body);
    }
    async findAll(search, status) {
        return this.establishmentsService.findAll({ search, status });
    }
    async findOne(id) {
        return this.establishmentsService.findOne(id);
    }
    async update(id, body) {
        return this.establishmentsService.update(id, body);
    }
    async deactivate(id) {
        await this.establishmentsService.deactivate(id);
        return { status: 'ok' };
    }
};
exports.EstablishmentsController = EstablishmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)('estabelecimentos.create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_establishment_dto_1.CreateEstablishmentDto]),
    __metadata("design:returntype", Promise)
], EstablishmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('estabelecimentos.read'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EstablishmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('estabelecimentos.read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstablishmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)('estabelecimentos.update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_establishment_dto_1.UpdateEstablishmentDto]),
    __metadata("design:returntype", Promise)
], EstablishmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.Permissions)('estabelecimentos.delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstablishmentsController.prototype, "deactivate", null);
exports.EstablishmentsController = EstablishmentsController = __decorate([
    (0, common_1.Controller)('establishments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [establishments_service_1.EstablishmentsService])
], EstablishmentsController);
//# sourceMappingURL=establishments.controller.js.map