import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Establishment } from './establishment.entity';
import { EstablishmentClass } from './establishment-class.entity';
import { EstablishmentStage } from './establishment-stage.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { CreateEstablishmentStageDto } from './dto/create-establishment-stage.dto';
import { CreateEstablishmentClassDto } from './dto/create-establishment-class.dto';
import { UpdateEstablishmentClassDto } from './dto/update-establishment-class.dto';

@Injectable()
export class EstablishmentsService {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentsRepo: Repository<Establishment>,
    @InjectRepository(EstablishmentStage)
    private readonly stagesRepo: Repository<EstablishmentStage>,
    @InjectRepository(EstablishmentClass)
    private readonly classesRepo: Repository<EstablishmentClass>,
  ) {}

  async create(dto: CreateEstablishmentDto): Promise<Establishment> {
    const establishment = this.establishmentsRepo.create({
      name: dto.name,
      inepCode: dto.inepCode ?? null,
      cityId: dto.cityId ?? null,
      status: 'active',
      totalStudents: 0,
      totalClasses: 0,
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

  async listStages(establishmentId: string) {
    await this.findOne(establishmentId);
    return this.stagesRepo.find({
      where: { establishmentId },
      order: { createdAt: 'ASC' },
    });
  }

  async createStage(establishmentId: string, dto: CreateEstablishmentStageDto) {
    await this.findOne(establishmentId);
    const stage = this.stagesRepo.create({
      establishmentId,
      name: dto.name,
    });
    return this.stagesRepo.save(stage);
  }

  async listClasses(establishmentId: string, stageId: string) {
    await this.findOne(establishmentId);
    return this.classesRepo.find({
      where: { categoryId: stageId },
      order: { createdAt: 'ASC' },
    });
  }

  async createClass(
    establishmentId: string,
    stageId: string,
    dto: CreateEstablishmentClassDto,
  ) {
    await this.findOne(establishmentId);
    const stage = await this.stagesRepo.findOne({ where: { id: stageId } });
    if (!stage || stage.establishmentId !== establishmentId) {
      throw new NotFoundException('Etapa nao encontrada');
    }

    const students = Number(dto.students ?? 0);
    const classItem = this.classesRepo.create({
      establishmentId,
      categoryId: stageId,
      name: dto.name,
      shift: dto.shift,
      students: Number.isNaN(students) ? 0 : students,
      active: dto.active ?? true,
    });

    const saved = await this.classesRepo.save(classItem);
    await this.recalculateTotals(establishmentId);
    return saved;
  }

  async updateClass(id: string, dto: UpdateEstablishmentClassDto) {
    const classItem = await this.classesRepo.findOne({ where: { id } });
    if (!classItem) {
      throw new NotFoundException('Turma nao encontrada');
    }

    const updated = this.classesRepo.merge(classItem, {
      ...dto,
      students: dto.students !== undefined ? Number(dto.students ?? 0) : classItem.students,
    });
    const saved = await this.classesRepo.save(updated);
    await this.recalculateTotalsByEstablishment(classItem.establishmentId);
    return saved;
  }

  async deleteClass(id: string) {
    const classItem = await this.classesRepo.findOne({ where: { id } });
    if (!classItem) {
      throw new NotFoundException('Turma nao encontrada');
    }
    await this.classesRepo.delete(id);
    await this.recalculateTotalsByEstablishment(classItem.establishmentId);
  }

  private async recalculateTotalsByEstablishment(establishmentId: string) {
    await this.recalculateTotals(establishmentId);
  }

  private async recalculateTotals(establishmentId: string) {
    const totals = await this.classesRepo
      .createQueryBuilder('cls')
      .where('cls.establishment_id = :establishmentId', { establishmentId })
      .select('COALESCE(SUM(cls.total_students), 0)', 'totalStudents')
      .addSelect('COUNT(cls.id)', 'totalClasses')
      .getRawOne<{ totalstudents: string; totalclasses: string }>();

    const totalStudents = Number(totals?.totalstudents ?? 0);
    const totalClasses = Number(totals?.totalclasses ?? 0);

    await this.establishmentsRepo.update(establishmentId, {
      totalStudents,
      totalClasses,
    });
  }
}
