import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from '../collaborators/collaborator.entity';
import { Contract } from '../contracts/contract.entity';
import { Establishment } from '../establishments/establishment.entity';
import { Aps } from '../aps/aps.entity';
import { User } from '../users/user.entity';
import { ServiceEntity } from '../services/service.entity';
import { Project } from '../projects/project.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Collaborator,
      Establishment,
      Contract,
      Aps,
      User,
      ServiceEntity,
      Project,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
