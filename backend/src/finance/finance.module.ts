import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollSummary } from './payroll-summary.entity';
import { IndirectExpense } from './indirect-expense.entity';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayrollSummary, IndirectExpense])],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
