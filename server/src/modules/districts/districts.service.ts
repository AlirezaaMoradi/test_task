// Imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { District } from './districts.entity';
import { City } from '../cities/cities.entity';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
  ) {}

  async searchDistricts(cityName?: string): Promise<District[]> {
    if (cityName) {
      return this.districtRepository.find({
        relations: ['city'],
        where: {
          city: { name: Like(`%${cityName}%`) },
        },
        order: { name: 'ASC' },
      });
    }

    return this.districtRepository.find({
      relations: ['city'],
      order: { name: 'ASC' },
    });
  }
}
