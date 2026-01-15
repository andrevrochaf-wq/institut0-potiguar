import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('agenda')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  @Permissions('agenda.create')
  async create(@Body() body: CreateAgendaDto) {
    return this.agendaService.create(body);
  }

  @Get()
  @Permissions('agenda.read')
  async findAll() {
    return this.agendaService.findAll();
  }

  @Get(':id')
  @Permissions('agenda.read')
  async findOne(@Param('id') id: string) {
    return this.agendaService.findOne(id);
  }

  @Patch(':id')
  @Permissions('agenda.update')
  async update(@Param('id') id: string, @Body() body: UpdateAgendaDto) {
    return this.agendaService.update(id, body);
  }

  @Delete(':id')
  @Permissions('agenda.delete')
  async remove(@Param('id') id: string) {
    await this.agendaService.remove(id);
    return { status: 'ok' };
  }
}
