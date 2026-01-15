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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const collaborator_entity_1 = require("../collaborators/collaborator.entity");
const establishment_entity_1 = require("../establishments/establishment.entity");
const contract_entity_1 = require("../contracts/contract.entity");
const aps_entity_1 = require("../aps/aps.entity");
const user_entity_1 = require("../users/user.entity");
const service_entity_1 = require("../services/service.entity");
const project_entity_1 = require("../projects/project.entity");
let DashboardService = class DashboardService {
    collaboratorsRepo;
    establishmentsRepo;
    contractsRepo;
    apsRepo;
    usersRepo;
    servicesRepo;
    projectsRepo;
    constructor(collaboratorsRepo, establishmentsRepo, contractsRepo, apsRepo, usersRepo, servicesRepo, projectsRepo) {
        this.collaboratorsRepo = collaboratorsRepo;
        this.establishmentsRepo = establishmentsRepo;
        this.contractsRepo = contractsRepo;
        this.apsRepo = apsRepo;
        this.usersRepo = usersRepo;
        this.servicesRepo = servicesRepo;
        this.projectsRepo = projectsRepo;
    }
    async getSummary() {
        const [collaboratorsTotal, collaboratorsActive, establishmentsTotal, contractsTotal, apsTotal, usersTotal, servicesTotal, projectsTotal,] = await Promise.all([
            this.collaboratorsRepo.count(),
            this.collaboratorsRepo.count({ where: { status: 'active' } }),
            this.establishmentsRepo.count(),
            this.contractsRepo.count(),
            this.apsRepo.count({ where: { active: true } }),
            this.usersRepo.count(),
            this.servicesRepo.count(),
            this.projectsRepo.count(),
        ]);
        return {
            totals: {
                collaborators: collaboratorsTotal,
                services: servicesTotal,
                aps: apsTotal,
                projects: projectsTotal,
                establishments: establishmentsTotal,
            },
            metrics: {
                dbStatus: 'online',
                collaboratorsActive,
                users: usersTotal,
                aps: apsTotal,
            },
        };
    }
    async getRecent() {
        const [collaborators, users] = await Promise.all([
            this.collaboratorsRepo.find({
                order: { createdAt: 'DESC' },
                take: 4,
            }),
            this.usersRepo.find({
                order: { createdAt: 'DESC' },
                take: 4,
            }),
        ]);
        return {
            notifications: {
                inactiveCollaborators: await this.collaboratorsRepo.count({
                    where: { status: 'inactive' },
                }),
                inactiveUsers: await this.usersRepo.count({ where: { active: false } }),
            },
            recentCollaborators: collaborators.map((item) => ({
                id: item.id,
                name: item.fullName,
            })),
            recentUsers: users.map((item) => ({
                id: item.id,
                name: item.fullName,
            })),
            updatedAt: new Date().toISOString(),
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collaborator_entity_1.Collaborator)),
    __param(1, (0, typeorm_1.InjectRepository)(establishment_entity_1.Establishment)),
    __param(2, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __param(3, (0, typeorm_1.InjectRepository)(aps_entity_1.Aps)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(5, (0, typeorm_1.InjectRepository)(service_entity_1.ServiceEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map