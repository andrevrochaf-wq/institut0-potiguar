import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('finance')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('payroll')
  @Permissions('financeiro_folha.create')
  async createPayroll(@Body() body: CreatePayrollDto) {
    return this.financeService.createPayroll(body);
  }

  @Get('payroll')
  @Permissions('financeiro_folha.read')
  async listPayroll() {
    return this.financeService.listPayroll();
  }

  @Post('expenses')
  @Permissions('financeiro_despesas.create')
  async createExpense(@Body() body: CreateExpenseDto) {
    return this.financeService.createExpense(body);
  }

  @Get('expenses')
  @Permissions('financeiro_despesas.read')
  async listExpenses() {
    return this.financeService.listExpenses();
  }
}
