// Imports
import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }
}