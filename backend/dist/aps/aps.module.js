"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const aps_entity_1 = require("./aps.entity");
const aps_controller_1 = require("./aps.controller");
const aps_service_1 = require("./aps.service");
let ApsModule = class ApsModule {
};
exports.ApsModule = ApsModule;
exports.ApsModule = ApsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([aps_entity_1.Aps])],
        controllers: [aps_controller_1.ApsController],
        providers: [aps_service_1.ApsService],
    })
], ApsModule);
//# sourceMappingURL=aps.module.js.map