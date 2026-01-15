import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
export declare class ProvidersController {
    private readonly providersService;
    constructor(providersService: ProvidersService);
    create(body: CreateProviderDto): Promise<import("./provider.entity").Provider>;
    findAll(): Promise<import("./provider.entity").Provider[]>;
    findOne(id: string): Promise<import("./provider.entity").Provider>;
    update(id: string, body: UpdateProviderDto): Promise<import("./provider.entity").Provider>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
