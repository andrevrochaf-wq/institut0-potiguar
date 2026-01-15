import { Repository } from 'typeorm';
import { Establishment } from './establishment.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
export declare class EstablishmentsService {
    private readonly establishmentsRepo;
    constructor(establishmentsRepo: Repository<Establishment>);
    create(dto: CreateEstablishmentDto): Promise<Establishment>;
    findAll(query: {
        search?: string;
        status?: string;
    }): Promise<Establishment[]>;
    findOne(id: string): Promise<Establishment>;
    update(id: string, dto: UpdateEstablishmentDto): Promise<Establishment>;
    deactivate(id: string): Promise<void>;
}
