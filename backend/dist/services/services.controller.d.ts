import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(body: CreateServiceDto): Promise<import("./service.entity").ServiceEntity>;
    findAll(): Promise<import("./service.entity").ServiceEntity[]>;
    findOne(id: string): Promise<import("./service.entity").ServiceEntity>;
    update(id: string, body: UpdateServiceDto): Promise<import("./service.entity").ServiceEntity>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
