import { Test, TestingModule } from '@nestjs/testing';
import { AgrupacionesService } from './agrupaciones.service';

describe('AgrupacionesService', () => {
  let service: AgrupacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgrupacionesService],
    }).compile();

    service = module.get<AgrupacionesService>(AgrupacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
