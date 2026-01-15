import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
export declare class ProvidersService {
    private readonly providersRepo;
    constructor(providersRepo: Repository<Provider>);
    create(dto: CreateProviderDto): Promise<Provider>;
    findAll(): Promise<Provider[]>;
    findOne(id: string): Promise<Provider>;
    update(id: string, dto: UpdateProviderDto): Promise<Provider>;
    remove(id: string): Promise<void>;
}
