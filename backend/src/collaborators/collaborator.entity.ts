import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name', type: 'text' })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  cpf: string | null;

  @Column({ type: 'text', nullable: true })
  rg: string | null;

  @Column({ name: 'bank_agency', type: 'text', nullable: true })
  bankAgency: string | null;

  @Column({ name: 'bank_account', type: 'text', nullable: true })
  bankAccount: string | null;

  @Column({ name: 'address_full', type: 'text', nullable: true })
  addressFull: string | null;

  @Column({ name: 'city_id', type: 'uuid', nullable: true })
  cityId: string | null;

  @Column({ type: 'text', default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
