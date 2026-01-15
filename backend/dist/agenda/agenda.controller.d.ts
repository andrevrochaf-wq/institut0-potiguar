import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
export declare class AgendaController {
    private readonly agendaService;
    constructor(agendaService: AgendaService);
    create(body: CreateAgendaDto): Promise<import("./agenda-entry.entity").AgendaEntry>;
    findAll(): Promise<import("./agenda-entry.entity").AgendaEntry[]>;
    findOne(id: string): Promise<import("./agenda-entry.entity").AgendaEntry>;
    update(id: string, body: UpdateAgendaDto): Promise<import("./agenda-entry.entity").AgendaEntry>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
