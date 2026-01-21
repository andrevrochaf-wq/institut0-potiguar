import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Permissions('projetos.create')
  async create(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @Get()
  @Permissions('projetos.read')
  async findAll(@Query('search') search?: string, @Query('status') status?: string) {
    return this.projectsService.findAll({ search, status });
  }

  @Get(':id')
  @Permissions('projetos.read')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @Permissions('projetos.update')
  async update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectsService.update(id, body);
  }

  @Delete(':id')
  @Permissions('projetos.delete')
  async remove(@Param('id') id: string) {
    await this.projectsService.remove(id);
    return { status: 'ok' };
  }
}
