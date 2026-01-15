import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('accountability_reports')
export class AccountabilityReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ name: 'city_id', type: 'uuid', nullable: true })
  cityId: string | null;

  @Column({ name: 'secretariat_id', type: 'uuid', nullable: true })
  secretariatId: string | null;

  @Column({ name: 'competency_month', type: 'int' })
  competencyMonth: number;

  @Column({ name: 'competency_year', type: 'int' })
  competencyYear: number;

  @Column({ type: 'text', default: 'draft' })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
