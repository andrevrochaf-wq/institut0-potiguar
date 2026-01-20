import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('establishments')
export class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'inep_code', type: 'text', nullable: true })
  inepCode: string | null;

  @Column({ name: 'city_id', type: 'uuid', nullable: true })
  cityId: string | null;

  @Column({ type: 'text', default: 'active' })
  status: string;

  @Column({ name: 'total_students', type: 'integer', default: 0 })
  totalStudents: number;

  @Column({ name: 'total_classes', type: 'integer', default: 0 })
  totalClasses: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
