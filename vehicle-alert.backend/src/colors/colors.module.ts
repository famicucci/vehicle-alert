import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colors } from './colors.entity';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Colors])],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
