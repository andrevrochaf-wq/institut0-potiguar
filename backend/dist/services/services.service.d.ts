import { Repository } from 'typeorm';
import { ServiceEntity } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesService {
    private readonly servicesRepo;
    constructor(servicesRepo: Repository<ServiceEntity>);
    create(dto: CreateServiceDto): Promise<ServiceEntity>;
    findAll(): Promise<ServiceEntity[]>;
    findOne(id: string): Promise<ServiceEntity>;
    update(id: string, dto: UpdateServiceDto): Promise<ServiceEntity>;
    remove(id: string): Promise<void>;
}
