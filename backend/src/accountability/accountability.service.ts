import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountabilityReport } from './accountability-report.entity';
import { CreateAccountabilityDto } from './dto/create-accountability.dto';
import { UpdateAccountabilityDto } from './dto/update-accountability.dto';

@Injectable()
export class AccountabilityService {
  constructor(
    @InjectRepository(AccountabilityReport)
    private readonly reportsRepo: Repository<AccountabilityReport>,
  ) {}

  async create(dto: CreateAccountabilityDto): Promise<AccountabilityReport> {
    const report = this.reportsRepo.create({
      title: dto.title,
      cityId: dto.cityId ?? null,
      secretariatId: dto.secretariatId ?? null,
      competencyMonth: dto.competencyMonth,
      competencyYear: dto.competencyYear,
      status: 'draft',
    });

    return this.reportsRepo.save(report);
  }

  async findAll() {
    return this.reportsRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<AccountabilityReport> {
    const report = await this.reportsRepo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Prestacao nao encontrada');
    }
    return report;
  }

  async update(id: string, dto: UpdateAccountabilityDto): Promise<AccountabilityReport> {
    const report = await this.findOne(id);
    const updated = this.reportsRepo.merge(report, { ...dto });
    return this.reportsRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.reportsRepo.delete(id);
  }
}
