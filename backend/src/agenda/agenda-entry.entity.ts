import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agenda_entries')
export class AgendaEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'event_date', type: 'date' })
  eventDate: string;

  @Column({ name: 'start_time', type: 'text', nullable: true })
  startTime: string | null;

  @Column({ name: 'end_time', type: 'text', nullable: true })
  endTime: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
