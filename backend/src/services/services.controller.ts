import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('services')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Permissions('servicos.create')
  async create(@Body() body: CreateServiceDto) {
    return this.servicesService.create(body);
  }

  @Get()
  @Permissions('servicos.read')
  async findAll(@Query('search') search?: string, @Query('status') status?: string) {
    return this.servicesService.findAll({ search, status });
  }

  @Get(':id')
  @Permissions('servicos.read')
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @Permissions('servicos.update')
  async update(@Param('id') id: string, @Body() body: UpdateServiceDto) {
    return this.servicesService.update(id, body);
  }

  @Delete(':id')
  @Permissions('servicos.delete')
  async remove(@Param('id') id: string) {
    await this.servicesService.remove(id);
    return { status: 'ok' };
  }
}
