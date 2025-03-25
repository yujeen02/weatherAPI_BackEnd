import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getOrCreateLocation(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ) {
    return this.locationService.getOrCreateLocation(+lat, +lon);
  }

  @Get('all')
  async getAll() {
    return this.locationService.getAllLocations();
  }
}
