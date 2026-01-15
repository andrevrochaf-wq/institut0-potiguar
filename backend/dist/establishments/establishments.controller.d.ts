import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
export declare class EstablishmentsController {
    private readonly establishmentsService;
    constructor(establishmentsService: EstablishmentsService);
    create(body: CreateEstablishmentDto): Promise<import("./establishment.entity").Establishment>;
    findAll(search?: string, status?: string): Promise<import("./establishment.entity").Establishment[]>;
    findOne(id: string): Promise<import("./establishment.entity").Establishment>;
    update(id: string, body: UpdateEstablishmentDto): Promise<import("./establishment.entity").Establishment>;
    deactivate(id: string): Promise<{
        status: string;
    }>;
}
