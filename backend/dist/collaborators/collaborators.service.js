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
exports.CollaboratorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const collaborator_entity_1 = require("./collaborator.entity");
let CollaboratorsService = class CollaboratorsService {
    collaboratorsRepo;
    constructor(collaboratorsRepo) {
        this.collaboratorsRepo = collaboratorsRepo;
    }
    async create(dto) {
        const collaborator = this.collaboratorsRepo.create({
            fullName: dto.fullName,
            cpf: dto.cpf ?? null,
            rg: dto.rg ?? null,
            bankAgency: dto.bankAgency ?? null,
            bankAccount: dto.bankAccount ?? null,
            addressFull: dto.addressFull ?? null,
            cityId: dto.cityId ?? null,
            status: 'active',
        });
        return this.collaboratorsRepo.save(collaborator);
    }
    async findAll(query) {
        const where = {};
        if (query.search) {
            where.fullName = (0, typeorm_2.ILike)(`%${query.search}%`);
        }
        if (query.status) {
            where.status = query.status;
        }
        return this.collaboratorsRepo.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const collaborator = await this.collaboratorsRepo.findOne({ where: { id } });
        if (!collaborator) {
            throw new common_1.NotFoundException('Colaborador nao encontrado');
        }
        return collaborator;
    }
    async update(id, dto) {
        const collaborator = await this.findOne(id);
        const updated = this.collaboratorsRepo.merge(collaborator, {
            ...dto,
        });
        return this.collaboratorsRepo.save(updated);
    }
    async deactivate(id) {
        const collaborator = await this.findOne(id);
        collaborator.status = 'inactive';
        await this.collaboratorsRepo.save(collaborator);
    }
};
exports.CollaboratorsService = CollaboratorsService;
exports.CollaboratorsService = CollaboratorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collaborator_entity_1.Collaborator)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CollaboratorsService);
//# sourceMappingURL=collaborators.service.js.map