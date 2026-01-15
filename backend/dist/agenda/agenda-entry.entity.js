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
exports.AgendaEntry = void 0;
const typeorm_1 = require("typeorm");
let AgendaEntry = class AgendaEntry {
    id;
    title;
    description;
    eventDate;
    startTime;
    endTime;
    createdAt;
};
exports.AgendaEntry = AgendaEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AgendaEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AgendaEntry.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], AgendaEntry.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_date', type: 'date' }),
    __metadata("design:type", String)
], AgendaEntry.prototype, "eventDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], AgendaEntry.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], AgendaEntry.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], AgendaEntry.prototype, "createdAt", void 0);
exports.AgendaEntry = AgendaEntry = __decorate([
    (0, typeorm_1.Entity)('agenda_entries')
], AgendaEntry);
//# sourceMappingURL=agenda-entry.entity.js.map