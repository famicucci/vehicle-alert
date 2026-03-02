import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { Vehicles } from './vehicles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicles])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
