import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'; // ✅ 추가
import { WeatherModule } from './weather/weather.module';
import { LocationModule } from './location/location.module';
import { Weather } from './weather/weather.entity';
import { Location } from './location/location.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'korizon5479@@',
      database: 'weather',
      entities: [Weather, Location],
      synchronize: true,
    }),
    HttpModule,
    WeatherModule,
    LocationModule,
  ],
})
export class AppModule {}
