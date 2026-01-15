import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Collaborator } from './collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorsRepo: Repository<Collaborator>,
  ) {}

  async create(dto: CreateCollaboratorDto): Promise<Collaborator> {
    const collaborator = this.collaboratorsRepo.create({
      fullName: dto.fullName,
      cpf: dto.cpf ?? null,
      rg: dto.rg ?? null,
      bankAgency: dto.bankAgency ?? null,
      bankAccount: dto.bankAccount ?? null,
      addressFull: dto.addressFull ?? null,
      cityId: dto.cityId ?? null,
      status: 'active',
    });

    return this.collaboratorsRepo.save(collaborator);
  }

  async findAll(query: { search?: string; status?: string }) {
    const where: Record<string, unknown> = {};

    if (query.search) {
      where.fullName = ILike(`%${query.search}%`);
    }

    if (query.status) {
      where.status = query.status;
    }

    return this.collaboratorsRepo.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Collaborator> {
    const collaborator = await this.collaboratorsRepo.findOne({ where: { id } });
    if (!collaborator) {
      throw new NotFoundException('Colaborador nao encontrado');
    }
    return collaborator;
  }

  async update(id: string, dto: UpdateCollaboratorDto): Promise<Collaborator> {
    const collaborator = await this.findOne(id);
    const updated = this.collaboratorsRepo.merge(collaborator, {
      ...dto,
    });
    return this.collaboratorsRepo.save(updated);
  }

  async deactivate(id: string): Promise<void> {
    const collaborator = await this.findOne(id);
    collaborator.status = 'inactive';
    await this.collaboratorsRepo.save(collaborator);
  }
}
