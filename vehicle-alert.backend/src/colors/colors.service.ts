import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestCases as ColorsEntity } from '../test-cases/test-cases.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(ColorsEntity)
    private colorsRepository: Repository<ColorsEntity>,
  ) {}

  getColors(): Promise<ColorsEntity[]> {
    return this.colorsRepository.find();
  }
}
