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

  @Column({ name: 'project_id', type: 'uuid', nullable: true })
  projectId: string | null;

  @Column({ name: 'secretariat_type', type: 'text' })
  secretariatType: string;

  @Column({ name: 'responsible_name', type: 'text' })
  responsibleName: string;

  @Column({ name: 'object_description', type: 'text', nullable: true })
  objectDescription: string | null;

  @Column({ name: 'competency_month', type: 'int' })
  competencyMonth: number;

  @Column({ name: 'competency_year', type: 'int' })
  competencyYear: number;

  @Column({ type: 'text', default: 'draft' })
  status: string;

  @Column({ name: 'pdf_url', type: 'text', nullable: true })
  pdfUrl: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
