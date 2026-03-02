import { Controller, Get } from '@nestjs/common';
import { VehicleStatusService } from './vehicle-status.service';

@Controller('vehicle-status')
export class VehicleStatusController {
  constructor(private readonly vehicleStatusService: VehicleStatusService) {}

  @Get('/')
  getVehicleStatus() {
    return this.vehicleStatusService.getVehicleStatus();
  }
}
