import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccountabilityService } from './accountability.service';
import { CreateAccountabilityDto } from './dto/create-accountability.dto';
import { UpdateAccountabilityDto } from './dto/update-accountability.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { CreateAccountabilityItemDto } from './dto/create-accountability-item.dto';

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

  @Get(':id/items')
  @Permissions('prestacao_contas.read')
  async listItems(@Param('id') id: string) {
    return this.accountabilityService.listItems(id);
  }

  @Post(':id/items')
  @Permissions('prestacao_contas.update')
  async addItem(@Param('id') id: string, @Body() body: CreateAccountabilityItemDto) {
    return this.accountabilityService.addItem(id, body);
  }

  @Delete(':id/items/:itemId')
  @Permissions('prestacao_contas.update')
  async removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    await this.accountabilityService.removeItem(id, itemId);
    return { status: 'ok' };
  }

  @Post(':id/submit')
  @Permissions('prestacao_contas.update')
  async submit(@Param('id') id: string) {
    return this.accountabilityService.updateStatus(id, 'review');
  }

  @Post(':id/approve')
  @Permissions('prestacao_contas.approve')
  async approve(@Param('id') id: string) {
    return this.accountabilityService.updateStatus(id, 'approved');
  }

  @Post(':id/close')
  @Permissions('prestacao_contas.approve')
  async close(@Param('id') id: string) {
    return this.accountabilityService.updateStatus(id, 'closed');
  }

  @Post(':id/pdf')
  @Permissions('prestacao_contas.generate_pdf')
  async generatePdf(@Param('id') id: string) {
    return this.accountabilityService.generatePdf(id);
  }

  @Delete(':id')
  @Permissions('prestacao_contas.delete')
  async remove(@Param('id') id: string) {
    await this.accountabilityService.remove(id);
    return { status: 'ok' };
  }
}
