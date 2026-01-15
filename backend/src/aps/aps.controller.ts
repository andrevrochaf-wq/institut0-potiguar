import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApsService } from './aps.service';
import { CreateApsDto } from './dto/create-aps.dto';
import { UpdateApsDto } from './dto/update-aps.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('aps')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ApsController {
  constructor(private readonly apsService: ApsService) {}

  @Post()
  @Permissions('aps.create')
  async create(@Body() body: CreateApsDto) {
    return this.apsService.create(body);
  }

  @Get()
  @Permissions('aps.read')
  async findAll(@Query('search') search?: string) {
    return this.apsService.findAll({ search });
  }

  @Get(':id')
  @Permissions('aps.read')
  async findOne(@Param('id') id: string) {
    return this.apsService.findOne(id);
  }

  @Patch(':id')
  @Permissions('aps.update')
  async update(@Param('id') id: string, @Body() body: UpdateApsDto) {
    return this.apsService.update(id, body);
  }

  @Delete(':id')
  @Permissions('aps.delete')
  async remove(@Param('id') id: string) {
    await this.apsService.remove(id);
    return { status: 'ok' };
  }
}
