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
exports.CitiesController = void 0;
const common_1 = require("@nestjs/common");
const cities_service_1 = require("./cities.service");
const create_city_dto_1 = require("./dto/create-city.dto");
const update_city_dto_1 = require("./dto/update-city.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let CitiesController = class CitiesController {
    citiesService;
    constructor(citiesService) {
        this.citiesService = citiesService;
    }
    async create(body) {
        return this.citiesService.create(body);
    }
    async findAll() {
        return this.citiesService.findAll();
    }
    async update(id, body) {
        return this.citiesService.update(id, body);
    }
    async remove(id) {
        await this.citiesService.remove(id);
        return { status: 'ok' };
    }
};
exports.CitiesController = CitiesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)('cidades.create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_city_dto_1.CreateCityDto]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('cidades.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)('cidades.update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_city_dto_1.UpdateCityDto]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.Permissions)('cidades.delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "remove", null);
exports.CitiesController = CitiesController = __decorate([
    (0, common_1.Controller)('cities'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [cities_service_1.CitiesService])
], CitiesController);
//# sourceMappingURL=cities.controller.js.map