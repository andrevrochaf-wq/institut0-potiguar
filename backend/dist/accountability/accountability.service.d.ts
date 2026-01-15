import { Repository } from 'typeorm';
import { AccountabilityReport } from './accountability-report.entity';
import { CreateAccountabilityDto } from './dto/create-accountability.dto';
import { UpdateAccountabilityDto } from './dto/update-accountability.dto';
export declare class AccountabilityService {
    private readonly reportsRepo;
    constructor(reportsRepo: Repository<AccountabilityReport>);
    create(dto: CreateAccountabilityDto): Promise<AccountabilityReport>;
    findAll(): Promise<AccountabilityReport[]>;
    findOne(id: string): Promise<AccountabilityReport>;
    update(id: string, dto: UpdateAccountabilityDto): Promise<AccountabilityReport>;
    remove(id: string): Promise<void>;
}
