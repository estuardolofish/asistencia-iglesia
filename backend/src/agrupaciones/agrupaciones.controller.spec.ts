import { Test, TestingModule } from '@nestjs/testing';
import { AgrupacionesController } from './agrupaciones.controller';

describe('AgrupacionesController', () => {
  let controller: AgrupacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgrupacionesController],
    }).compile();

    controller = module.get<AgrupacionesController>(AgrupacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
