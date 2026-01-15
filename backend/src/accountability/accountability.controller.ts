import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccountabilityService } from './accountability.service';
import { CreateAccountabilityDto } from './dto/create-accountability.dto';
import { UpdateAccountabilityDto } from './dto/update-accountability.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('accountability')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AccountabilityController {
  constructor(private readonly accountabilityService: AccountabilityService) {}

  @Post()
  @Permissions('prestacao_contas.create')
  async create(@Body() body: CreateAccountabilityDto) {
    return this.accountabilityService.create(body);
  }

  @Get()
  @Permissions('prestacao_contas.read')
  async findAll() {
    return this.accountabilityService.findAll();
  }

  @Get(':id')
  @Permissions('prestacao_contas.read')
  async findOne(@Param('id') id: string) {
    return this.accountabilityService.findOne(id);
  }

  @Patch(':id')
  @Permissions('prestacao_contas.update')
  async update(@Param('id') id: string, @Body() body: UpdateAccountabilityDto) {
    return this.accountabilityService.update(id, body);
  }

  @Delete(':id')
  @Permissions('prestacao_contas.delete')
  async remove(@Param('id') id: string) {
    await this.accountabilityService.remove(id);
    return { status: 'ok' };
  }
}
