import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('establishment_categories')
export class EstablishmentStage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'establishment_id', type: 'uuid' })
  establishmentId: string;

  @Column({ type: 'text' })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
