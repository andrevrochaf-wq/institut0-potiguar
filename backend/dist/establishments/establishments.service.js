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
exports.EstablishmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const establishment_entity_1 = require("./establishment.entity");
let EstablishmentsService = class EstablishmentsService {
    establishmentsRepo;
    constructor(establishmentsRepo) {
        this.establishmentsRepo = establishmentsRepo;
    }
    async create(dto) {
        const establishment = this.establishmentsRepo.create({
            name: dto.name,
            inepCode: dto.inepCode ?? null,
            cityId: dto.cityId ?? null,
            status: 'active',
        });
        return this.establishmentsRepo.save(establishment);
    }
    async findAll(query) {
        const where = {};
        if (query.search) {
            where.name = (0, typeorm_2.ILike)(`%${query.search}%`);
        }
        if (query.status) {
            where.status = query.status;
        }
        return this.establishmentsRepo.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const establishment = await this.establishmentsRepo.findOne({ where: { id } });
        if (!establishment) {
            throw new common_1.NotFoundException('Estabelecimento nao encontrado');
        }
        return establishment;
    }
    async update(id, dto) {
        const establishment = await this.findOne(id);
        const updated = this.establishmentsRepo.merge(establishment, {
            ...dto,
        });
        return this.establishmentsRepo.save(updated);
    }
    async deactivate(id) {
        const establishment = await this.findOne(id);
        establishment.status = 'inactive';
        await this.establishmentsRepo.save(establishment);
    }
};
exports.EstablishmentsService = EstablishmentsService;
exports.EstablishmentsService = EstablishmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(establishment_entity_1.Establishment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EstablishmentsService);
//# sourceMappingURL=establishments.service.js.map