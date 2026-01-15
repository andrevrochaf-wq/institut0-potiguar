import { AccountabilityService } from './accountability.service';
import { CreateAccountabilityDto } from './dto/create-accountability.dto';
import { UpdateAccountabilityDto } from './dto/update-accountability.dto';
export declare class AccountabilityController {
    private readonly accountabilityService;
    constructor(accountabilityService: AccountabilityService);
    create(body: CreateAccountabilityDto): Promise<import("./accountability-report.entity").AccountabilityReport>;
    findAll(): Promise<import("./accountability-report.entity").AccountabilityReport[]>;
    findOne(id: string): Promise<import("./accountability-report.entity").AccountabilityReport>;
    update(id: string, body: UpdateAccountabilityDto): Promise<import("./accountability-report.entity").AccountabilityReport>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
