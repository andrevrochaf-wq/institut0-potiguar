import { FinanceService } from './finance.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    createPayroll(body: CreatePayrollDto): Promise<import("./payroll-summary.entity").PayrollSummary>;
    listPayroll(): Promise<import("./payroll-summary.entity").PayrollSummary[]>;
    createExpense(body: CreateExpenseDto): Promise<import("./indirect-expense.entity").IndirectExpense>;
    listExpenses(): Promise<import("./indirect-expense.entity").IndirectExpense[]>;
}
