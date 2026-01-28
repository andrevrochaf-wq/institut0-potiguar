import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  document: string | null;

  @Column({ type: 'text', name: 'contract_type', nullable: true })
  contractType: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', name: 'bank_code', nullable: true })
  bankCode: string | null;

  @Column({ type: 'text', name: 'bank_name', nullable: true })
  bankName: string | null;

  @Column({ type: 'text', nullable: true })
  agency: string | null;

  @Column({ type: 'text', nullable: true })
  account: string | null;

  @Column({ type: 'text', name: 'pix_type', nullable: true })
  pixType: string | null;

  @Column({ type: 'text', name: 'pix_key', nullable: true })
  pixKey: string | null;

  @Column({ type: 'text', array: true, name: 'city_ids', nullable: true })
  cityIds: string[] | null;

  @Column({ type: 'text', nullable: true })
  phone: string | null;

  @Column({ type: 'text', nullable: true })
  email: string | null;

  @Column({ type: 'text', nullable: true })
  address: string | null;

  @Column({ type: 'text', default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
