import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
export declare class ContractsService {
    private readonly contractsRepo;
    constructor(contractsRepo: Repository<Contract>);
    create(dto: CreateContractDto): Promise<Contract>;
    findAll(): Promise<Contract[]>;
    findOne(id: string): Promise<Contract>;
    update(id: string, dto: UpdateContractDto): Promise<Contract>;
    cancel(id: string): Promise<void>;
}
