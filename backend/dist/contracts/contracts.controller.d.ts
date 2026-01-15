import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
export declare class ContractsController {
    private readonly contractsService;
    constructor(contractsService: ContractsService);
    create(body: CreateContractDto): Promise<import("./contract.entity").Contract>;
    findAll(): Promise<import("./contract.entity").Contract[]>;
    findOne(id: string): Promise<import("./contract.entity").Contract>;
    update(id: string, body: UpdateContractDto): Promise<import("./contract.entity").Contract>;
    cancel(id: string): Promise<{
        status: string;
    }>;
}
