import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepo.create({
      name: dto.name,
      description: dto.description ?? null,
      status: 'active',
    });
    return this.projectsRepo.save(project);
  }

  async findAll(query: { search?: string; status?: string }) {
    const where: Record<string, unknown> = {};

    if (query.search) {
      where.name = ILike(`%${query.search}%`);
    }

    if (query.status) {
      where.status = query.status;
    }

    return this.projectsRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepo.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Projeto nao encontrado');
    }
    return project;
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    const updated = this.projectsRepo.merge(project, { ...dto });
    return this.projectsRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.projectsRepo.delete(id);
  }
}
