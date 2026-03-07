import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicles } from './vehicles.entity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('/')
  getVehicles(@Query('search') search: string) {
    return this.vehiclesService.getVehicles(search);
  }

  @Post('/')
  createVehicle(@Body() vehicleData: Partial<Vehicles>) {
    return this.vehiclesService.createVehicle(vehicleData);
  }
}
