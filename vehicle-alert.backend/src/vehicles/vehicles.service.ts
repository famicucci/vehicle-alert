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

  getVehicles(search?: string): Promise<Vehicles[]> {
    const query = this.vehiclesRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.brand', 'brand')
      .leftJoinAndSelect('vehicle.color', 'color')
      .leftJoinAndSelect('vehicle.status', 'status');

    if (search) {
      const words = search.split(' ').filter(Boolean);
      words.forEach((word, idx) => {
        const param = `word${idx}`;
        const condition = `(
          vehicle.plateNumber LIKE :${param} OR
          brand.name LIKE :${param} OR
          color.name LIKE :${param}
        )`;
        if (idx === 0) {
          query.where(condition, { [param]: `%${word}%` });
        } else {
          query.andWhere(condition, { [param]: `%${word}%` });
        }
      });
    }

    return query.getMany();
  }

  createVehicle(vehicle: Partial<Vehicles>): Promise<Vehicles> {
    const newVehicle = this.vehiclesRepository.create(vehicle);
    return this.vehiclesRepository.save(newVehicle);
  }
}
