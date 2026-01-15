import { Repository } from 'typeorm';
import { Collaborator } from '../collaborators/collaborator.entity';
import { Establishment } from '../establishments/establishment.entity';
import { Contract } from '../contracts/contract.entity';
import { Aps } from '../aps/aps.entity';
import { User } from '../users/user.entity';
import { ServiceEntity } from '../services/service.entity';
import { Project } from '../projects/project.entity';
export declare class DashboardService {
    private readonly collaboratorsRepo;
    private readonly establishmentsRepo;
    private readonly contractsRepo;
    private readonly apsRepo;
    private readonly usersRepo;
    private readonly servicesRepo;
    private readonly projectsRepo;
    constructor(collaboratorsRepo: Repository<Collaborator>, establishmentsRepo: Repository<Establishment>, contractsRepo: Repository<Contract>, apsRepo: Repository<Aps>, usersRepo: Repository<User>, servicesRepo: Repository<ServiceEntity>, projectsRepo: Repository<Project>);
    getSummary(): Promise<{
        totals: {
            collaborators: number;
            services: number;
            aps: number;
            projects: number;
            establishments: number;
        };
        metrics: {
            dbStatus: string;
            collaboratorsActive: number;
            users: number;
            aps: number;
        };
    }>;
    getRecent(): Promise<{
        notifications: {
            inactiveCollaborators: number;
            inactiveUsers: number;
        };
        recentCollaborators: {
            id: string;
            name: string;
        }[];
        recentUsers: {
            id: string;
            name: string;
        }[];
        updatedAt: string;
    }>;
}
