import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payroll_summaries')
export class PayrollSummary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'competency_month', type: 'int' })
  competencyMonth: number;

  @Column({ name: 'competency_year', type: 'int' })
  competencyYear: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  total: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
