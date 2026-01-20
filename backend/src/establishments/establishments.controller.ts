import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { CreateEstablishmentStageDto } from './dto/create-establishment-stage.dto';
import { CreateEstablishmentClassDto } from './dto/create-establishment-class.dto';
import { UpdateEstablishmentClassDto } from './dto/update-establishment-class.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('establishments')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post()
  @Permissions('estabelecimentos.create')
  async create(@Body() body: CreateEstablishmentDto) {
    return this.establishmentsService.create(body);
  }

  @Get()
  @Permissions('estabelecimentos.read')
  async findAll(@Query('search') search?: string, @Query('status') status?: string) {
    return this.establishmentsService.findAll({ search, status });
  }

  @Get(':id')
  @Permissions('estabelecimentos.read')
  async findOne(@Param('id') id: string) {
    return this.establishmentsService.findOne(id);
  }

  @Patch(':id')
  @Permissions('estabelecimentos.update')
  async update(@Param('id') id: string, @Body() body: UpdateEstablishmentDto) {
    return this.establishmentsService.update(id, body);
  }

  @Delete(':id')
  @Permissions('estabelecimentos.delete')
  async deactivate(@Param('id') id: string) {
    await this.establishmentsService.deactivate(id);
    return { status: 'ok' };
  }

  @Get(':id/stages')
  @Permissions('estabelecimentos.read')
  async listStages(@Param('id') id: string) {
    return this.establishmentsService.listStages(id);
  }

  @Post(':id/stages')
  @Permissions('estabelecimentos.create')
  async createStage(@Param('id') id: string, @Body() body: CreateEstablishmentStageDto) {
    return this.establishmentsService.createStage(id, body);
  }

  @Get(':id/stages/:stageId/classes')
  @Permissions('estabelecimentos.read')
  async listClasses(@Param('id') id: string, @Param('stageId') stageId: string) {
    return this.establishmentsService.listClasses(id, stageId);
  }

  @Post(':id/stages/:stageId/classes')
  @Permissions('estabelecimentos.create')
  async createClass(
    @Param('id') id: string,
    @Param('stageId') stageId: string,
    @Body() body: CreateEstablishmentClassDto,
  ) {
    return this.establishmentsService.createClass(id, stageId, body);
  }

  @Patch('classes/:id')
  @Permissions('estabelecimentos.update')
  async updateClass(@Param('id') id: string, @Body() body: UpdateEstablishmentClassDto) {
    return this.establishmentsService.updateClass(id, body);
  }

  @Delete('classes/:id')
  @Permissions('estabelecimentos.delete')
  async deleteClass(@Param('id') id: string) {
    await this.establishmentsService.deleteClass(id);
    return { status: 'ok' };
  }
}
