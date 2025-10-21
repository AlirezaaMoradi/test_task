// Imports
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataResponse } from '../interceptors/data-response/index.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitiesModule } from '../modules/cities/cities.module';
import { DistrictsModule } from '../modules/districts/districts.module';

// Configs
import appConfig from '../configs/app-config';
import pgConfig from '../configs/pg-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, pgConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (service: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: 'postgres',
        port: +service.get('pgConfig.port'),
        database: service.get('pgConfig.database'),
        username: service.get('pgConfig.user'),
        password: service.get('pgConfig.pass'),
      })
    }),
    CitiesModule,
    DistrictsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponse
    }
  ],
})
export class AppModule {}
