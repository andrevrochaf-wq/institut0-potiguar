import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    create(body: CreateNewsDto): Promise<import("./news.entity").News>;
    findAll(): Promise<import("./news.entity").News[]>;
    update(id: string, body: UpdateNewsDto): Promise<import("./news.entity").News>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
