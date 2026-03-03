import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicles } from './vehicles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicles)
    private vehiclesRepository: Repository<Vehicles>,
  ) {}

  getVehicles() {
    return this.vehiclesRepository.find({
      relations: ['brand', 'color', 'status'],
    });
  }

  createVehicle(vehicle: Partial<Vehicles>): Promise<Vehicles> {
    const newVehicle = this.vehiclesRepository.create(vehicle);
    return this.vehiclesRepository.save(newVehicle);
  }
}
