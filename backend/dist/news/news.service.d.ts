import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsService {
    private readonly newsRepo;
    constructor(newsRepo: Repository<News>);
    create(dto: CreateNewsDto): Promise<News>;
    findAll(): Promise<News[]>;
    update(id: string, dto: UpdateNewsDto): Promise<News>;
    remove(id: string): Promise<void>;
}
