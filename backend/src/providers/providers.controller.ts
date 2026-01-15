import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('providers')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @Permissions('fornecedores.create')
  async create(@Body() body: CreateProviderDto) {
    return this.providersService.create(body);
  }

  @Get()
  @Permissions('fornecedores.read')
  async findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  @Permissions('fornecedores.read')
  async findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }

  @Patch(':id')
  @Permissions('fornecedores.update')
  async update(@Param('id') id: string, @Body() body: UpdateProviderDto) {
    return this.providersService.update(id, body);
  }

  @Delete(':id')
  @Permissions('fornecedores.delete')
  async remove(@Param('id') id: string) {
    await this.providersService.remove(id);
    return { status: 'ok' };
  }
}
