import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { CollaboratorsService } from './collaborators.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('collaborators')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  @Permissions('colaboradores.create')
  async create(@Body() body: CreateCollaboratorDto) {
    return this.collaboratorsService.create(body);
  }

  @Get()
  @Permissions('colaboradores.read')
  async findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('cityId') cityId?: string,
    @Query('projectId') projectId?: string,
    @Query('establishmentId') establishmentId?: string,
    @Query('serviceId') serviceId?: string,
    @Query('contractType') contractType?: string,
    @Query('bankName') bankName?: string,
  ) {
    return this.collaboratorsService.findAll({
      search,
      status,
      cityId,
      projectId,
      establishmentId,
      serviceId,
      contractType,
      bankName,
    });
  }

  @Get(':id')
  @Permissions('colaboradores.read')
  async findOne(@Param('id') id: string) {
    return this.collaboratorsService.findOne(id);
  }

  @Patch(':id')
  @Permissions('colaboradores.update')
  async update(@Param('id') id: string, @Body() body: UpdateCollaboratorDto) {
    return this.collaboratorsService.update(id, body);
  }

  @Delete(':id')
  @Permissions('colaboradores.delete')
  async deactivate(@Param('id') id: string) {
    await this.collaboratorsService.deactivate(id);
    return { status: 'ok' };
  }
}
