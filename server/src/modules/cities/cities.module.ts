// Imports
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "./cities.entity";
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { District } from "../districts/districts.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([City, District]),
    
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService]
})
export class CitiesModule {}