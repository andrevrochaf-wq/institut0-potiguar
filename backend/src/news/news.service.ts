import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(News) private readonly newsRepo: Repository<News>) {}

  async create(dto: CreateNewsDto): Promise<News> {
    const news = this.newsRepo.create({ title: dto.title, content: dto.content });
    return this.newsRepo.save(news);
  }

  async findAll() {
    return this.newsRepo.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: string, dto: UpdateNewsDto): Promise<News> {
    const item = await this.newsRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Noticia nao encontrada');
    }
    const updated = this.newsRepo.merge(item, { ...dto });
    return this.newsRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.newsRepo.delete(id);
  }
}
