import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(body: CreateProjectDto): Promise<import("./project.entity").Project>;
    findAll(): Promise<import("./project.entity").Project[]>;
    findOne(id: string): Promise<import("./project.entity").Project>;
    update(id: string, body: UpdateProjectDto): Promise<import("./project.entity").Project>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
