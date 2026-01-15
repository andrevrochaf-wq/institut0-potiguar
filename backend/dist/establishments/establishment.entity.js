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
exports.Establishment = void 0;
const typeorm_1 = require("typeorm");
let Establishment = class Establishment {
    id;
    name;
    inepCode;
    cityId;
    status;
    createdAt;
    updatedAt;
};
exports.Establishment = Establishment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Establishment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Establishment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'inep_code', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Establishment.prototype, "inepCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Establishment.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'active' }),
    __metadata("design:type", String)
], Establishment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Establishment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Establishment.prototype, "updatedAt", void 0);
exports.Establishment = Establishment = __decorate([
    (0, typeorm_1.Entity)('establishments')
], Establishment);
//# sourceMappingURL=establishment.entity.js.map