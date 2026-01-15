import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Aps } from './aps.entity';
import { CreateApsDto } from './dto/create-aps.dto';
import { UpdateApsDto } from './dto/update-aps.dto';

@Injectable()
export class ApsService {
  constructor(
    @InjectRepository(Aps)
    private readonly apsRepo: Repository<Aps>,
  ) {}

  async create(dto: CreateApsDto): Promise<Aps> {
    const aps = this.apsRepo.create({
      code: dto.code,
      title: dto.title,
      description: dto.description ?? null,
      active: true,
    });

    return this.apsRepo.save(aps);
  }

  async findAll(query: { search?: string }) {
    const where: Record<string, unknown> = {};
    if (query.search) {
      where.title = ILike(`%${query.search}%`);
    }
    return this.apsRepo.find({ order: { createdAt: 'DESC' }, where });
  }

  async findOne(id: string): Promise<Aps> {
    const aps = await this.apsRepo.findOne({ where: { id } });
    if (!aps) {
      throw new NotFoundException('APS nao encontrada');
    }
    return aps;
  }

  async update(id: string, dto: UpdateApsDto): Promise<Aps> {
    const aps = await this.findOne(id);
    const updated = this.apsRepo.merge(aps, { ...dto });
    return this.apsRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.apsRepo.delete(id);
  }
}
