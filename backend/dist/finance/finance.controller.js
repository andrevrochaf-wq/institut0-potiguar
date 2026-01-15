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
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const finance_service_1 = require("./finance.service");
const create_payroll_dto_1 = require("./dto/create-payroll.dto");
const create_expense_dto_1 = require("./dto/create-expense.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let FinanceController = class FinanceController {
    financeService;
    constructor(financeService) {
        this.financeService = financeService;
    }
    async createPayroll(body) {
        return this.financeService.createPayroll(body);
    }
    async listPayroll() {
        return this.financeService.listPayroll();
    }
    async createExpense(body) {
        return this.financeService.createExpense(body);
    }
    async listExpenses() {
        return this.financeService.listExpenses();
    }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.Post)('payroll'),
    (0, permissions_decorator_1.Permissions)('financeiro_folha.create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payroll_dto_1.CreatePayrollDto]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "createPayroll", null);
__decorate([
    (0, common_1.Get)('payroll'),
    (0, permissions_decorator_1.Permissions)('financeiro_folha.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "listPayroll", null);
__decorate([
    (0, common_1.Post)('expenses'),
    (0, permissions_decorator_1.Permissions)('financeiro_despesas.create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expense_dto_1.CreateExpenseDto]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "createExpense", null);
__decorate([
    (0, common_1.Get)('expenses'),
    (0, permissions_decorator_1.Permissions)('financeiro_despesas.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "listExpenses", null);
exports.FinanceController = FinanceController = __decorate([
    (0, common_1.Controller)('finance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [finance_service_1.FinanceService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map