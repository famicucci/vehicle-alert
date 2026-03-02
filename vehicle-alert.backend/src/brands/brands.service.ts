import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brands } from './brands.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands)
    private brandsRepository: Repository<Brands>,
  ) {}

  getBrands() {
    return this.brandsRepository.find();
  }

  createBrand(brand: { name: string }) {
    const newBrand = this.brandsRepository.create(brand);
    return this.brandsRepository.save(newBrand);
  }
}
