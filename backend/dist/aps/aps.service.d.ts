import { Repository } from 'typeorm';
import { Aps } from './aps.entity';
import { CreateApsDto } from './dto/create-aps.dto';
import { UpdateApsDto } from './dto/update-aps.dto';
export declare class ApsService {
    private readonly apsRepo;
    constructor(apsRepo: Repository<Aps>);
    create(dto: CreateApsDto): Promise<Aps>;
    findAll(query: {
        search?: string;
    }): Promise<Aps[]>;
    findOne(id: string): Promise<Aps>;
    update(id: string, dto: UpdateApsDto): Promise<Aps>;
    remove(id: string): Promise<void>;
}
