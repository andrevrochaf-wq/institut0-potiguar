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
exports.AccountabilityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const accountability_report_entity_1 = require("./accountability-report.entity");
let AccountabilityService = class AccountabilityService {
    reportsRepo;
    constructor(reportsRepo) {
        this.reportsRepo = reportsRepo;
    }
    async create(dto) {
        const report = this.reportsRepo.create({
            title: dto.title,
            cityId: dto.cityId ?? null,
            secretariatId: dto.secretariatId ?? null,
            competencyMonth: dto.competencyMonth,
            competencyYear: dto.competencyYear,
            status: 'draft',
        });
        return this.reportsRepo.save(report);
    }
    async findAll() {
        return this.reportsRepo.find({ order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const report = await this.reportsRepo.findOne({ where: { id } });
        if (!report) {
            throw new common_1.NotFoundException('Prestacao nao encontrada');
        }
        return report;
    }
    async update(id, dto) {
        const report = await this.findOne(id);
        const updated = this.reportsRepo.merge(report, { ...dto });
        return this.reportsRepo.save(updated);
    }
    async remove(id) {
        await this.findOne(id);
        await this.reportsRepo.delete(id);
    }
};
exports.AccountabilityService = AccountabilityService;
exports.AccountabilityService = AccountabilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(accountability_report_entity_1.AccountabilityReport)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountabilityService);
//# sourceMappingURL=accountability.service.js.map