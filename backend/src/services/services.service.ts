import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly servicesRepo: Repository<ServiceEntity>,
  ) {}

  async create(dto: CreateServiceDto): Promise<ServiceEntity> {
    const service = this.servicesRepo.create({
      name: dto.name,
      description: dto.description ?? null,
    });
    return this.servicesRepo.save(service);
  }

  async findAll() {
    return this.servicesRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<ServiceEntity> {
    const service = await this.servicesRepo.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException('Servico nao encontrado');
    }
    return service;
  }

  async update(id: string, dto: UpdateServiceDto): Promise<ServiceEntity> {
    const service = await this.findOne(id);
    const updated = this.servicesRepo.merge(service, { ...dto });
    return this.servicesRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.servicesRepo.delete(id);
  }
}
