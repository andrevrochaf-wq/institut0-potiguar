import { Repository } from 'typeorm';
import { AgendaEntry } from './agenda-entry.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
export declare class AgendaService {
    private readonly agendaRepo;
    constructor(agendaRepo: Repository<AgendaEntry>);
    create(dto: CreateAgendaDto): Promise<AgendaEntry>;
    findAll(): Promise<AgendaEntry[]>;
    findOne(id: string): Promise<AgendaEntry>;
    update(id: string, dto: UpdateAgendaDto): Promise<AgendaEntry>;
    remove(id: string): Promise<void>;
}
