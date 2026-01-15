import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    summary(): Promise<{
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
    recent(): Promise<{
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
