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
exports.ProvidersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const provider_entity_1 = require("./provider.entity");
let ProvidersService = class ProvidersService {
    providersRepo;
    constructor(providersRepo) {
        this.providersRepo = providersRepo;
    }
    async create(dto) {
        const provider = this.providersRepo.create({
            name: dto.name,
            document: dto.document ?? null,
            phone: dto.phone ?? null,
            email: dto.email ?? null,
        });
        return this.providersRepo.save(provider);
    }
    async findAll() {
        return this.providersRepo.find({ order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const provider = await this.providersRepo.findOne({ where: { id } });
        if (!provider) {
            throw new common_1.NotFoundException('Fornecedor nao encontrado');
        }
        return provider;
    }
    async update(id, dto) {
        const provider = await this.findOne(id);
        const updated = this.providersRepo.merge(provider, { ...dto });
        return this.providersRepo.save(updated);
    }
    async remove(id) {
        await this.findOne(id);
        await this.providersRepo.delete(id);
    }
};
exports.ProvidersService = ProvidersService;
exports.ProvidersService = ProvidersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(provider_entity_1.Provider)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProvidersService);
//# sourceMappingURL=providers.service.js.map