import { ApsService } from './aps.service';
import { CreateApsDto } from './dto/create-aps.dto';
import { UpdateApsDto } from './dto/update-aps.dto';
export declare class ApsController {
    private readonly apsService;
    constructor(apsService: ApsService);
    create(body: CreateApsDto): Promise<import("./aps.entity").Aps>;
    findAll(search?: string): Promise<import("./aps.entity").Aps[]>;
    findOne(id: string): Promise<import("./aps.entity").Aps>;
    update(id: string, body: UpdateApsDto): Promise<import("./aps.entity").Aps>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
