import { Test, TestingModule } from '@nestjs/testing';
import { VehicleStatusService } from './vehicle-status.service';

describe('VehicleStatusService', () => {
  let service: VehicleStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleStatusService],
    }).compile();

    service = module.get<VehicleStatusService>(VehicleStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
