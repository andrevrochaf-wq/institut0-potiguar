import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('establishment_classes')
export class EstablishmentClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'establishment_id', type: 'uuid' })
  establishmentId: string;

  @Column({ name: 'category_id', type: 'uuid', nullable: true })
  categoryId: string | null;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  shift: string;

  @Column({ name: 'total_students', type: 'integer', default: 0 })
  students: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
