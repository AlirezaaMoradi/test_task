// Imports
import { Controller } from "@nestjs/common";
import { Get, Query } from "@nestjs/common";
import { DistrictsService } from "./districts.service";

// Routes
@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Get()
  async getDistricts(@Query('query') query?: string) {
    const districts = await this.districtsService.searchDistricts(query);
    return districts.map(d => ({
      id: d.id,
      name: d.name,
      city: { id: d.city.id, name: d.city.name },
    }));
  }
}