import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { AgendaEntry } from './agenda-entry.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(AgendaEntry)
    private readonly agendaRepo: Repository<AgendaEntry>,
  ) {}

  async create(dto: CreateAgendaDto): Promise<AgendaEntry> {
    const entry = this.agendaRepo.create({
      title: dto.title,
      description: dto.description ?? null,
      eventDate: dto.eventDate,
      startTime: dto.startTime ?? null,
      endTime: dto.endTime ?? null,
      location: dto.location ?? null,
      status: 'active',
    });
    return this.agendaRepo.save(entry);
  }

  async findAll(query: {
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const where: Record<string, unknown> = {};

    if (query.search) {
      where.title = ILike(`%${query.search}%`);
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.dateFrom && query.dateTo) {
      where.eventDate = Between(query.dateFrom, query.dateTo);
    } else if (query.dateFrom) {
      where.eventDate = Between(query.dateFrom, query.dateFrom);
    } else if (query.dateTo) {
      where.eventDate = Between(query.dateTo, query.dateTo);
    }

    return this.agendaRepo.find({ where, order: { eventDate: 'DESC' } });
  }

  async findOne(id: string): Promise<AgendaEntry> {
    const entry = await this.agendaRepo.findOne({ where: { id } });
    if (!entry) {
      throw new NotFoundException('Agenda nao encontrada');
    }
    return entry;
  }

  async update(id: string, dto: UpdateAgendaDto): Promise<AgendaEntry> {
    const entry = await this.findOne(id);
    const updated = this.agendaRepo.merge(entry, { ...dto });
    return this.agendaRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.agendaRepo.delete(id);
  }
}
