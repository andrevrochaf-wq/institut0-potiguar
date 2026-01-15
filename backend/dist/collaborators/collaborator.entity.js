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
exports.Collaborator = void 0;
const typeorm_1 = require("typeorm");
let Collaborator = class Collaborator {
    id;
    fullName;
    cpf;
    rg;
    bankAgency;
    bankAccount;
    addressFull;
    cityId;
    status;
    createdAt;
    updatedAt;
};
exports.Collaborator = Collaborator;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Collaborator.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', type: 'text' }),
    __metadata("design:type", String)
], Collaborator.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Collaborator.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Collaborator.prototype, "rg", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_agency', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Collaborator.prototype, "bankAgency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_account', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Collaborator.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_full', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Collaborator.prototype, "addressFull", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Collaborator.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'active' }),
    __metadata("design:type", String)
], Collaborator.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Collaborator.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Collaborator.prototype, "updatedAt", void 0);
exports.Collaborator = Collaborator = __decorate([
    (0, typeorm_1.Entity)('collaborators')
], Collaborator);
//# sourceMappingURL=collaborator.entity.js.map