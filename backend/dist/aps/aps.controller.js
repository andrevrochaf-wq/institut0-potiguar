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
exports.ApsController = void 0;
const common_1 = require("@nestjs/common");
const aps_service_1 = require("./aps.service");
const create_aps_dto_1 = require("./dto/create-aps.dto");
const update_aps_dto_1 = require("./dto/update-aps.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let ApsController = class ApsController {
    apsService;
    constructor(apsService) {
        this.apsService = apsService;
    }
    async create(body) {
        return this.apsService.create(body);
    }
    async findAll(search) {
        return this.apsService.findAll({ search });
    }
    async findOne(id) {
        return this.apsService.findOne(id);
    }
    async update(id, body) {
        return this.apsService.update(id, body);
    }
    async remove(id) {
        await this.apsService.remove(id);
        return { status: 'ok' };
    }
};
exports.ApsController = ApsController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)('aps.create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aps_dto_1.CreateApsDto]),
    __metadata("design:returntype", Promise)
], ApsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('aps.read'),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('aps.read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)('aps.update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_aps_dto_1.UpdateApsDto]),
    __metadata("design:returntype", Promise)
], ApsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.Permissions)('aps.delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApsController.prototype, "remove", null);
exports.ApsController = ApsController = __decorate([
    (0, common_1.Controller)('aps'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [aps_service_1.ApsService])
], ApsController);
//# sourceMappingURL=aps.controller.js.map