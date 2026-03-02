import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleStatus } from './vehicle-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleStatusService {
  constructor(
    @InjectRepository(VehicleStatus)
    private vehicleStatusRepository: Repository<VehicleStatus>,
  ) {}

  getVehicleStatus() {
    return this.vehicleStatusRepository.find();
  }

  createVehicleStatus(status: Partial<VehicleStatus>): Promise<VehicleStatus> {
    const newStatus = this.vehicleStatusRepository.create(status);
    return this.vehicleStatusRepository.save(newStatus);
  }
}
