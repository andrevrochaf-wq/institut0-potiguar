"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountabilityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const accountability_controller_1 = require("./accountability.controller");
const accountability_report_entity_1 = require("./accountability-report.entity");
const accountability_service_1 = require("./accountability.service");
let AccountabilityModule = class AccountabilityModule {
};
exports.AccountabilityModule = AccountabilityModule;
exports.AccountabilityModule = AccountabilityModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([accountability_report_entity_1.AccountabilityReport])],
        controllers: [accountability_controller_1.AccountabilityController],
        providers: [accountability_service_1.AccountabilityService],
    })
], AccountabilityModule);
//# sourceMappingURL=accountability.module.js.map