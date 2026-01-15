import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayrollSummary } from './payroll-summary.entity';
import { IndirectExpense } from './indirect-expense.entity';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(PayrollSummary)
    private readonly payrollRepo: Repository<PayrollSummary>,
    @InjectRepository(IndirectExpense)
    private readonly expenseRepo: Repository<IndirectExpense>,
  ) {}

  async createPayroll(dto: CreatePayrollDto) {
    const entry = this.payrollRepo.create({
      competencyMonth: dto.competencyMonth,
      competencyYear: dto.competencyYear,
      total: dto.total,
    });
    return this.payrollRepo.save(entry);
  }

  async listPayroll() {
    return this.payrollRepo.find({ order: { createdAt: 'DESC' } });
  }

  async createExpense(dto: CreateExpenseDto) {
    const entry = this.expenseRepo.create({
      title: dto.title,
      amount: dto.amount,
      competencyMonth: dto.competencyMonth,
      competencyYear: dto.competencyYear,
    });
    return this.expenseRepo.save(entry);
  }

  async listExpenses() {
    return this.expenseRepo.find({ order: { createdAt: 'DESC' } });
  }
}
