// Imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './districts.entity';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { CitiesModule } from '../cities/cities.module';
import { City } from '../cities/cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([District, City]), CitiesModule],
  controllers: [DistrictsController],
  providers: [DistrictsService],
})
export class DistrictsModule {}