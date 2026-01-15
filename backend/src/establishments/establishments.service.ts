import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Establishment } from './establishment.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentsService {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentsRepo: Repository<Establishment>,
  ) {}

  async create(dto: CreateEstablishmentDto): Promise<Establishment> {
    const establishment = this.establishmentsRepo.create({
      name: dto.name,
      inepCode: dto.inepCode ?? null,
      cityId: dto.cityId ?? null,
      status: 'active',
    });

    return this.establishmentsRepo.save(establishment);
  }

  async findAll(query: { search?: string; status?: string }) {
    const where: Record<string, unknown> = {};

    if (query.search) {
      where.name = ILike(`%${query.search}%`);
    }

    if (query.status) {
      where.status = query.status;
    }

    return this.establishmentsRepo.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Establishment> {
    const establishment = await this.establishmentsRepo.findOne({ where: { id } });
    if (!establishment) {
      throw new NotFoundException('Estabelecimento nao encontrado');
    }
    return establishment;
  }

  async update(id: string, dto: UpdateEstablishmentDto): Promise<Establishment> {
    const establishment = await this.findOne(id);
    const updated = this.establishmentsRepo.merge(establishment, {
      ...dto,
    });
    return this.establishmentsRepo.save(updated);
  }

  async deactivate(id: string): Promise<void> {
    const establishment = await this.findOne(id);
    establishment.status = 'inactive';
    await this.establishmentsRepo.save(establishment);
  }
}
