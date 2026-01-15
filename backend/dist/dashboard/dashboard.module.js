"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const collaborator_entity_1 = require("../collaborators/collaborator.entity");
const contract_entity_1 = require("../contracts/contract.entity");
const establishment_entity_1 = require("../establishments/establishment.entity");
const aps_entity_1 = require("../aps/aps.entity");
const user_entity_1 = require("../users/user.entity");
const service_entity_1 = require("../services/service.entity");
const project_entity_1 = require("../projects/project.entity");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_service_1 = require("./dashboard.service");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                collaborator_entity_1.Collaborator,
                establishment_entity_1.Establishment,
                contract_entity_1.Contract,
                aps_entity_1.Aps,
                user_entity_1.User,
                service_entity_1.ServiceEntity,
                project_entity_1.Project,
            ]),
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map