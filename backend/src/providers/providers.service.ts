import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providersRepo: Repository<Provider>,
  ) {}

  async create(dto: CreateProviderDto): Promise<Provider> {
    const provider = this.providersRepo.create({
      name: dto.name,
      document: dto.document ?? null,
      phone: dto.phone ?? null,
      email: dto.email ?? null,
    });
    return this.providersRepo.save(provider);
  }

  async findAll() {
    return this.providersRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Provider> {
    const provider = await this.providersRepo.findOne({ where: { id } });
    if (!provider) {
      throw new NotFoundException('Fornecedor nao encontrado');
    }
    return provider;
  }

  async update(id: string, dto: UpdateProviderDto): Promise<Provider> {
    const provider = await this.findOne(id);
    const updated = this.providersRepo.merge(provider, { ...dto });
    return this.providersRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.providersRepo.delete(id);
  }
}
