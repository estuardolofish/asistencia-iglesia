import { Test, TestingModule } from '@nestjs/testing';
import { HermanosService } from './hermanos.service';

describe('HermanosService', () => {
  let service: HermanosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HermanosService],
    }).compile();

    service = module.get<HermanosService>(HermanosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
