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

  @Column({ type: 'text', nullable: true })
  email: string | null;

  @Column({ type: 'text', nullable: true })
  phone: string | null;

  @Column({ name: 'role_title', type: 'text', nullable: true })
  roleTitle: string | null;

  @Column({ name: 'contract_type', type: 'text', nullable: true })
  contractType: string | null;

  @Column({ name: 'bank_agency', type: 'text', nullable: true })
  bankAgency: string | null;

  @Column({ name: 'bank_account', type: 'text', nullable: true })
  bankAccount: string | null;

  @Column({ name: 'bank_name', type: 'text', nullable: true })
  bankName: string | null;

  @Column({ name: 'address_full', type: 'text', nullable: true })
  addressFull: string | null;

  @Column({ name: 'city_id', type: 'uuid', nullable: true })
  cityId: string | null;

  @Column({ name: 'project_id', type: 'uuid', nullable: true })
  projectId: string | null;

  @Column({ name: 'establishment_id', type: 'uuid', nullable: true })
  establishmentId: string | null;

  @Column({ name: 'service_id', type: 'uuid', nullable: true })
  serviceId: string | null;

  @Column({ name: 'admission_date', type: 'date', nullable: true })
  admissionDate: string | null;

  @Column({ type: 'text', default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
