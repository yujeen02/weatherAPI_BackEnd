import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from './weather.entity';
import { Location } from '../location/location.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  private readonly OPEN_WEATHER_KEY: string;
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {
    this.OPEN_WEATHER_KEY = this.configService.get<string>('OPEN_WEATHER_KEY')!;
  }

  async fetchRealtimeWeather(lat: number, lon: number): Promise<any> {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const params = {
      lat,
      lon,
      units: 'metric',
      appid: this.OPEN_WEATHER_KEY,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { params }),
      );
      const data = response.data;

      const weather = {
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        wind_speed: data.wind.speed,
        humidity: data.main.humidity,
        city: data.name,
      };

      return weather;
    } catch (error) {
      this.logger.error(`🚨 API 요청 실패: ${error.message}`);
      return null;
    }
  }

  async getOrCreateLocation(lat: number, lon: number): Promise<Location> {
    let location = await this.locationRepository.findOne({
      where: { latitude: lat, longitude: lon },
    });

    if (!location) {
      const newLocation = this.locationRepository.create({
        latitude: lat,
        longitude: lon,
      });
      location = await this.locationRepository.save(newLocation);
    }

    return location;
  }

  async saveWeatherData(lat: number, lon: number) {
    const weatherData = await this.fetchRealtimeWeather(lat, lon);
    if (!weatherData) return null;

    const location = await this.getOrCreateLocation(lat, lon);

    const newWeather = this.weatherRepository.create({
      location,
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      wind_speed: weatherData.wind_speed,
      weather_main: weatherData.weather,
      weather_desc: weatherData.description,
    });

    return await this.weatherRepository.save(newWeather);
  }

  async getWeather(lat: number, lon: number) {
    const recentWeather = await this.weatherRepository.findOne({
      where: { location: { latitude: lat, longitude: lon } },
      order: { recorded_at: 'DESC' },
    });

    if (recentWeather) {
      this.logger.log('✅ 캐시된 데이터 반환');
      return recentWeather;
    }

    this.logger.log('🌍 API 호출 후 데이터 저장');
    return await this.saveWeatherData(lat, lon);
  }
}
