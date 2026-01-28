import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Permissions('usuarios.read')
  async list() {
    return this.usersService.listUsers();
  }

  @Post()
  @Permissions('usuarios.create')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Delete(':id')
  @Permissions('usuarios.update')
  async delete(@Param('id') id: string, @Req() req: { user?: { userId?: string } }) {
    if (req.user?.userId === id) {
      throw new BadRequestException('Nao e possivel excluir o proprio usuario.');
    }
    await this.usersService.deleteUser(id);
    return { status: 'ok' };
  }

  @Post(':id/deactivate')
  @Permissions('usuarios.update')
  async deactivate(@Param('id') id: string) {
    await this.usersService.deactivate(id);
    return { status: 'ok' };
  }

  @Post(':id/activate')
  @Permissions('usuarios.update')
  async activate(@Param('id') id: string) {
    await this.usersService.activate(id);
    return { status: 'ok' };
  }

  @Post(':id/roles')
  @Permissions('usuarios.update')
  async assignRole(@Param('id') id: string, @Body('roleName') roleName: string) {
    await this.usersService.assignRole(id, roleName);
    return { status: 'ok' };
  }

  // hard delete handled by DELETE /users/:id
}
