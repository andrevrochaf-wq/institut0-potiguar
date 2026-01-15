import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('cities')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @Permissions('cidades.create')
  async create(@Body() body: CreateCityDto) {
    return this.citiesService.create(body);
  }

  @Get()
  @Permissions('cidades.read')
  async findAll() {
    return this.citiesService.findAll();
  }

  @Patch(':id')
  @Permissions('cidades.update')
  async update(@Param('id') id: string, @Body() body: UpdateCityDto) {
    return this.citiesService.update(id, body);
  }

  @Delete(':id')
  @Permissions('cidades.delete')
  async remove(@Param('id') id: string) {
    await this.citiesService.remove(id);
    return { status: 'ok' };
  }
}
