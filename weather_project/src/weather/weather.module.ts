import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { Weather } from './weather.entity';
import { Location } from '../location/location.entity';

@Module({
  // 이 모듈 안에서 사용할 외부 모듈 가져옴
  // entity를 모듈 안에서 사용할 수 있도록 등록
  // HTTP 요청을 할 수 있게 함
  imports: [TypeOrmModule.forFeature([Weather, Location]), HttpModule],
  // 외부 요청 받음
  controllers: [WeatherController],
  // 실제 로직을 처리하는 서비스 등록
  providers: [WeatherService],
  // 외부 모듈에서도 쓸 수 있게 공개
  exports: [WeatherService],
})
export class WeatherModule {}
