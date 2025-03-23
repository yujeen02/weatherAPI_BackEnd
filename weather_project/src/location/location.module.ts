import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])], // ✅ TypeORM 등록
  exports: [TypeOrmModule], // ✅ WeatherModule에서 사용 가능하도록 export
})
export class LocationModule {}
