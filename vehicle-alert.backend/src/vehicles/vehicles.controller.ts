import { Body, Controller, Get, Post } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicles } from './vehicles.entity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('/')
  getVehicles() {
    return this.vehiclesService.getVehicles();
  }

  @Post('/')
  createVehicle(@Body() vehicleData: Partial<Vehicles>) {
    return this.vehiclesService.createVehicle(vehicleData);
  }
}
