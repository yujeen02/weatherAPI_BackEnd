import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
// /weather로 들어오는 요청 담당
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  // readonly: 변경 불가
  // private readonly: this로 접근 가능
  @Get()
  // get 요청
  async getWeather(@Query('lat') lat: string, @Query('lon') lon: string) {
    // + : 문자열을 숫자로 변환
    return this.weatherService.getWeather(+lat, +lon);
    // this: 현재 클래스 weatherController
  }
}
