import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('contracts')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @Permissions('contratos.create')
  async create(@Body() body: CreateContractDto) {
    return this.contractsService.create(body);
  }

  @Get()
  @Permissions('contratos.read')
  async findAll() {
    return this.contractsService.findAll();
  }

  @Get(':id')
  @Permissions('contratos.read')
  async findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id);
  }

  @Patch(':id')
  @Permissions('contratos.update')
  async update(@Param('id') id: string, @Body() body: UpdateContractDto) {
    return this.contractsService.update(id, body);
  }

  @Delete(':id')
  @Permissions('contratos.delete')
  async cancel(@Param('id') id: string) {
    await this.contractsService.cancel(id);
    return { status: 'ok' };
  }

  @Post(':id/sign')
  @Permissions('contratos.update')
  async sign(@Param('id') id: string) {
    return this.contractsService.sign(id);
  }

  @Post(':id/close')
  @Permissions('contratos.update')
  async close(@Param('id') id: string) {
    return this.contractsService.close(id);
  }
}
