import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(@InjectRepository(City) private readonly citiesRepo: Repository<City>) {}

  async create(dto: CreateCityDto): Promise<City> {
    const city = this.citiesRepo.create({
      name: dto.name,
      state: dto.state.toUpperCase(),
    });
    return this.citiesRepo.save(city);
  }

  async findAll() {
    return this.citiesRepo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<City> {
    const city = await this.citiesRepo.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException('Cidade nao encontrada');
    }
    return city;
  }

  async update(id: string, dto: UpdateCityDto): Promise<City> {
    const city = await this.findOne(id);
    const updated = this.citiesRepo.merge(city, {
      ...dto,
      state: dto.state?.toUpperCase(),
    });
    return this.citiesRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.citiesRepo.delete(id);
  }
}
