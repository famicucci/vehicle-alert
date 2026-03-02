import { Module } from '@nestjs/common';
import { VehicleStatusController } from './vehicle-status.controller';
import { VehicleStatusService } from './vehicle-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleStatus } from './vehicle-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleStatus])],
  controllers: [VehicleStatusController],
  providers: [VehicleStatusService],
})
export class VehicleStatusModule {}
