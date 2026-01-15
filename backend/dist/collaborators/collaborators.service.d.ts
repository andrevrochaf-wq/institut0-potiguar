import { Repository } from 'typeorm';
import { Collaborator } from './collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
export declare class CollaboratorsService {
    private readonly collaboratorsRepo;
    constructor(collaboratorsRepo: Repository<Collaborator>);
    create(dto: CreateCollaboratorDto): Promise<Collaborator>;
    findAll(query: {
        search?: string;
        status?: string;
    }): Promise<Collaborator[]>;
    findOne(id: string): Promise<Collaborator>;
    update(id: string, dto: UpdateCollaboratorDto): Promise<Collaborator>;
    deactivate(id: string): Promise<void>;
}
