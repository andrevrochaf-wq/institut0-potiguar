import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CitiesController {
    private readonly citiesService;
    constructor(citiesService: CitiesService);
    create(body: CreateCityDto): Promise<import("./city.entity").City>;
    findAll(): Promise<import("./city.entity").City[]>;
    update(id: string, body: UpdateCityDto): Promise<import("./city.entity").City>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
