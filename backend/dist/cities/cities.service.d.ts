import { Repository } from 'typeorm';
import { City } from './city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CitiesService {
    private readonly citiesRepo;
    constructor(citiesRepo: Repository<City>);
    create(dto: CreateCityDto): Promise<City>;
    findAll(): Promise<City[]>;
    findOne(id: string): Promise<City>;
    update(id: string, dto: UpdateCityDto): Promise<City>;
    remove(id: string): Promise<void>;
}
