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
      email: dto.email ?? null,
      phone: dto.phone ?? null,
      roleTitle: dto.roleTitle ?? null,
      contractType: dto.contractType ?? null,
      bankAgency: dto.bankAgency ?? null,
      bankAccount: dto.bankAccount ?? null,
      bankName: dto.bankName ?? null,
      addressFull: dto.addressFull ?? null,
      cityId: dto.cityId ?? null,
      projectId: dto.projectId ?? null,
      establishmentId: dto.establishmentId ?? null,
      serviceId: dto.serviceId ?? null,
      admissionDate: dto.admissionDate ?? null,
      status: 'active',
    });

    return this.collaboratorsRepo.save(collaborator);
  }

  async findAll(query: {
    search?: string;
    status?: string;
    cityId?: string;
    projectId?: string;
    establishmentId?: string;
    serviceId?: string;
    contractType?: string;
    bankName?: string;
  }) {
    const where: Record<string, unknown> = {};

    if (query.search) {
      where.fullName = ILike(`%${query.search}%`);
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.cityId) {
      where.cityId = query.cityId;
    }

    if (query.projectId) {
      where.projectId = query.projectId;
    }

    if (query.establishmentId) {
      where.establishmentId = query.establishmentId;
    }

    if (query.serviceId) {
      where.serviceId = query.serviceId;
    }

    if (query.contractType) {
      where.contractType = query.contractType;
    }

    if (query.bankName) {
      where.bankName = ILike(`%${query.bankName}%`);
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
