import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractsRepo: Repository<Contract>,
  ) {}

  async create(dto: CreateContractDto): Promise<Contract> {
    const contract = this.contractsRepo.create({
      collaboratorId: dto.collaboratorId,
      cityId: dto.cityId,
      bankName: dto.bankName,
      contractType: dto.contractType,
      templateId: dto.templateId ?? null,
      startDate: dto.startDate,
      endDate: dto.endDate ?? null,
      amount: dto.amount,
      status: 'draft',
    });

    return this.contractsRepo.save(contract);
  }

  async findAll() {
    return this.contractsRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractsRepo.findOne({ where: { id } });
    if (!contract) {
      throw new NotFoundException('Contrato nao encontrado');
    }
    return contract;
  }

  async update(id: string, dto: UpdateContractDto): Promise<Contract> {
    const contract = await this.findOne(id);
    const updated = this.contractsRepo.merge(contract, {
      ...dto,
    });
    return this.contractsRepo.save(updated);
  }

  async cancel(id: string): Promise<void> {
    const contract = await this.findOne(id);
    contract.status = 'cancelled';
    await this.contractsRepo.save(contract);
  }

  async sign(id: string): Promise<Contract> {
    const contract = await this.findOne(id);
    contract.status = 'signed';
    return this.contractsRepo.save(contract);
  }

  async close(id: string): Promise<Contract> {
    const contract = await this.findOne(id);
    contract.status = 'closed';
    return this.contractsRepo.save(contract);
  }
}
