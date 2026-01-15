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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountabilityReport = void 0;
const typeorm_1 = require("typeorm");
let AccountabilityReport = class AccountabilityReport {
    id;
    title;
    cityId;
    secretariatId;
    competencyMonth;
    competencyYear;
    status;
    createdAt;
    updatedAt;
};
exports.AccountabilityReport = AccountabilityReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AccountabilityReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AccountabilityReport.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], AccountabilityReport.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'secretariat_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], AccountabilityReport.prototype, "secretariatId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'competency_month', type: 'int' }),
    __metadata("design:type", Number)
], AccountabilityReport.prototype, "competencyMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'competency_year', type: 'int' }),
    __metadata("design:type", Number)
], AccountabilityReport.prototype, "competencyYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'draft' }),
    __metadata("design:type", String)
], AccountabilityReport.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], AccountabilityReport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], AccountabilityReport.prototype, "updatedAt", void 0);
exports.AccountabilityReport = AccountabilityReport = __decorate([
    (0, typeorm_1.Entity)('accountability_reports')
], AccountabilityReport);
//# sourceMappingURL=accountability-report.entity.js.map