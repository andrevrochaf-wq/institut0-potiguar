import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from '../collaborators/collaborator.entity';
import { Establishment } from '../establishments/establishment.entity';
import { Contract } from '../contracts/contract.entity';
import { Aps } from '../aps/aps.entity';
import { User } from '../users/user.entity';
import { ServiceEntity } from '../services/service.entity';
import { Project } from '../projects/project.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorsRepo: Repository<Collaborator>,
    @InjectRepository(Establishment)
    private readonly establishmentsRepo: Repository<Establishment>,
    @InjectRepository(Contract)
    private readonly contractsRepo: Repository<Contract>,
    @InjectRepository(Aps)
    private readonly apsRepo: Repository<Aps>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(ServiceEntity)
    private readonly servicesRepo: Repository<ServiceEntity>,
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
  ) {}

  async getSummary() {
    const [
      collaboratorsTotal,
      collaboratorsActive,
      establishmentsTotal,
      contractsTotal,
      apsTotal,
      usersTotal,
      servicesTotal,
      projectsTotal,
    ] = await Promise.all([
      this.collaboratorsRepo.count(),
      this.collaboratorsRepo.count({ where: { status: 'active' } }),
      this.establishmentsRepo.count(),
      this.contractsRepo.count(),
      this.apsRepo.count({ where: { active: true } }),
      this.usersRepo.count(),
      this.servicesRepo.count(),
      this.projectsRepo.count(),
    ]);

    return {
      totals: {
        collaborators: collaboratorsTotal,
        services: servicesTotal,
        aps: apsTotal,
        projects: projectsTotal,
        establishments: establishmentsTotal,
      },
      metrics: {
        dbStatus: 'online',
        collaboratorsActive,
        users: usersTotal,
        aps: apsTotal,
      },
    };
  }

  async getRecent() {
    const [collaborators, users] = await Promise.all([
      this.collaboratorsRepo.find({
        order: { createdAt: 'DESC' },
        take: 4,
      }),
      this.usersRepo.find({
        order: { createdAt: 'DESC' },
        take: 4,
      }),
    ]);

    return {
      notifications: {
        inactiveCollaborators: await this.collaboratorsRepo.count({
          where: { status: 'inactive' },
        }),
        inactiveUsers: await this.usersRepo.count({ where: { active: false } }),
      },
      recentCollaborators: collaborators.map((item) => ({
        id: item.id,
        name: item.fullName,
      })),
      recentUsers: users.map((item) => ({
        id: item.id,
        name: item.fullName,
      })),
      updatedAt: new Date().toISOString(),
    };
  }
}
