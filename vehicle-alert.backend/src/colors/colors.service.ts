import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colors as ColorsEntity } from '../colors/colors.entity';
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

  createColor(color: Partial<ColorsEntity>): Promise<ColorsEntity> {
    const newColor = this.colorsRepository.create(color);
    return this.colorsRepository.save(newColor);
  }
}
