import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('news')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @Permissions('noticias.create')
  async create(@Body() body: CreateNewsDto) {
    return this.newsService.create(body);
  }

  @Get()
  @Permissions('noticias.read')
  async findAll() {
    return this.newsService.findAll();
  }

  @Patch(':id')
  @Permissions('noticias.update')
  async update(@Param('id') id: string, @Body() body: UpdateNewsDto) {
    return this.newsService.update(id, body);
  }

  @Delete(':id')
  @Permissions('noticias.delete')
  async remove(@Param('id') id: string) {
    await this.newsService.remove(id);
    return { status: 'ok' };
  }
}
