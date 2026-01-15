import { Repository } from 'typeorm';
import { PayrollSummary } from './payroll-summary.entity';
import { IndirectExpense } from './indirect-expense.entity';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class FinanceService {
    private readonly payrollRepo;
    private readonly expenseRepo;
    constructor(payrollRepo: Repository<PayrollSummary>, expenseRepo: Repository<IndirectExpense>);
    createPayroll(dto: CreatePayrollDto): Promise<PayrollSummary>;
    listPayroll(): Promise<PayrollSummary[]>;
    createExpense(dto: CreateExpenseDto): Promise<IndirectExpense>;
    listExpenses(): Promise<IndirectExpense[]>;
}
