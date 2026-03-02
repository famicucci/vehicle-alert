import { Test, TestingModule } from '@nestjs/testing';
import { VehicleStatusController } from './vehicle-status.controller';

describe('VehicleStatusController', () => {
  let controller: VehicleStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleStatusController],
    }).compile();

    controller = module.get<VehicleStatusController>(VehicleStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
