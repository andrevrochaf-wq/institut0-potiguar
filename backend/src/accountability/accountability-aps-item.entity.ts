import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('accountability_aps_items')
export class AccountabilityApsItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'report_id', type: 'uuid' })
  reportId: string;

  @Column({ name: 'aps_id', type: 'uuid' })
  apsId: string;

  @Column({ name: 'aps_code', type: 'text' })
  apsCode: string;

  @Column({ name: 'aps_title', type: 'text' })
  apsTitle: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
