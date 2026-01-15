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
exports.CitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const city_entity_1 = require("./city.entity");
let CitiesService = class CitiesService {
    citiesRepo;
    constructor(citiesRepo) {
        this.citiesRepo = citiesRepo;
    }
    async create(dto) {
        const city = this.citiesRepo.create({
            name: dto.name,
            state: dto.state.toUpperCase(),
        });
        return this.citiesRepo.save(city);
    }
    async findAll() {
        return this.citiesRepo.find({ order: { name: 'ASC' } });
    }
    async findOne(id) {
        const city = await this.citiesRepo.findOne({ where: { id } });
        if (!city) {
            throw new common_1.NotFoundException('Cidade nao encontrada');
        }
        return city;
    }
    async update(id, dto) {
        const city = await this.findOne(id);
        const updated = this.citiesRepo.merge(city, {
            ...dto,
            state: dto.state?.toUpperCase(),
        });
        return this.citiesRepo.save(updated);
    }
    async remove(id) {
        await this.findOne(id);
        await this.citiesRepo.delete(id);
    }
};
exports.CitiesService = CitiesService;
exports.CitiesService = CitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CitiesService);
//# sourceMappingURL=cities.service.js.map