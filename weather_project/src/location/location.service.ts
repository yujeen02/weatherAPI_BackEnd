import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
  
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getOrCreateLocation(lat: number, lon: number): Promise<Location> {
    let location = await this.locationRepository.findOne({
      where: { latitude: lat, longitude: lon },
    });

    if (!location) {
      const locationData: DeepPartial<Location> = {
        latitude: lat,
        longitude: lon,
        city: null,
        district: null,
      };

      location = this.locationRepository.create(locationData);
      await this.locationRepository.save(location);
    }

    return location;
  }

  async getAllLocations(): Promise<Location[]> {
    return this.locationRepository.find();
  }
}
