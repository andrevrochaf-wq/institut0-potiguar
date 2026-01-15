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
exports.ApsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aps_entity_1 = require("./aps.entity");
let ApsService = class ApsService {
    apsRepo;
    constructor(apsRepo) {
        this.apsRepo = apsRepo;
    }
    async create(dto) {
        const aps = this.apsRepo.create({
            code: dto.code,
            title: dto.title,
            description: dto.description ?? null,
            active: true,
        });
        return this.apsRepo.save(aps);
    }
    async findAll(query) {
        const where = {};
        if (query.search) {
            where.title = (0, typeorm_2.ILike)(`%${query.search}%`);
        }
        return this.apsRepo.find({ order: { createdAt: 'DESC' }, where });
    }
    async findOne(id) {
        const aps = await this.apsRepo.findOne({ where: { id } });
        if (!aps) {
            throw new common_1.NotFoundException('APS nao encontrada');
        }
        return aps;
    }
    async update(id, dto) {
        const aps = await this.findOne(id);
        const updated = this.apsRepo.merge(aps, { ...dto });
        return this.apsRepo.save(updated);
    }
    async remove(id) {
        await this.findOne(id);
        await this.apsRepo.delete(id);
    }
};
exports.ApsService = ApsService;
exports.ApsService = ApsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aps_entity_1.Aps)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ApsService);
//# sourceMappingURL=aps.service.js.map