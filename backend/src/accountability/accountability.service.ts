import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountabilityReport } from './accountability-report.entity';
import { CreateAccountabilityDto } from './dto/create-accountability.dto';
import { UpdateAccountabilityDto } from './dto/update-accountability.dto';
import { AccountabilityApsItem } from './accountability-aps-item.entity';
import { CreateAccountabilityItemDto } from './dto/create-accountability-item.dto';
import { Aps } from '../aps/aps.entity';

@Injectable()
export class AccountabilityService {
  constructor(
    @InjectRepository(AccountabilityReport)
    private readonly reportsRepo: Repository<AccountabilityReport>,
    @InjectRepository(AccountabilityApsItem)
    private readonly itemsRepo: Repository<AccountabilityApsItem>,
    @InjectRepository(Aps)
    private readonly apsRepo: Repository<Aps>,
  ) {}

  async create(dto: CreateAccountabilityDto): Promise<AccountabilityReport> {
    const report = this.reportsRepo.create({
      title: dto.title,
      cityId: dto.cityId,
      projectId: dto.projectId,
      secretariatType: dto.secretariatType,
      responsibleName: dto.responsibleName,
      objectDescription: dto.objectDescription ?? null,
      competencyMonth: dto.competencyMonth,
      competencyYear: dto.competencyYear,
      status: 'draft',
      pdfUrl: null,
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

  async listItems(reportId: string): Promise<AccountabilityApsItem[]> {
    await this.findOne(reportId);
    return this.itemsRepo.find({ where: { reportId }, order: { createdAt: 'DESC' } });
  }

  async addItem(reportId: string, dto: CreateAccountabilityItemDto) {
    await this.findOne(reportId);
    const aps = await this.apsRepo.findOne({ where: { id: dto.apsId } });
    if (!aps) {
      throw new NotFoundException('APS nao encontrada');
    }

    const item = this.itemsRepo.create({
      reportId,
      apsId: aps.id,
      apsCode: aps.code,
      apsTitle: aps.title,
      description: dto.description ?? null,
      amount: dto.amount,
      notes: dto.notes ?? null,
    });
    return this.itemsRepo.save(item);
  }

  async removeItem(reportId: string, itemId: string): Promise<void> {
    await this.findOne(reportId);
    const item = await this.itemsRepo.findOne({ where: { id: itemId, reportId } });
    if (!item) {
      throw new NotFoundException('Item nao encontrado');
    }
    await this.itemsRepo.delete(itemId);
  }

  async updateStatus(reportId: string, status: string): Promise<AccountabilityReport> {
    const report = await this.findOne(reportId);
    report.status = status;
    return this.reportsRepo.save(report);
  }

  async generatePdf(reportId: string): Promise<{ pdfUrl: string }> {
    const report = await this.findOne(reportId);
    const pdfUrl = `generated://accountability/${reportId}`;
    report.pdfUrl = pdfUrl;
    await this.reportsRepo.save(report);
    return { pdfUrl };
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.reportsRepo.delete(id);
  }
}
