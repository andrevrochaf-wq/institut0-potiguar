import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { CollaboratorsService } from './collaborators.service';
export declare class CollaboratorsController {
    private readonly collaboratorsService;
    constructor(collaboratorsService: CollaboratorsService);
    create(body: CreateCollaboratorDto): Promise<import("./collaborator.entity").Collaborator>;
    findAll(search?: string, status?: string): Promise<import("./collaborator.entity").Collaborator[]>;
    findOne(id: string): Promise<import("./collaborator.entity").Collaborator>;
    update(id: string, body: UpdateCollaboratorDto): Promise<import("./collaborator.entity").Collaborator>;
    deactivate(id: string): Promise<{
        status: string;
    }>;
}
