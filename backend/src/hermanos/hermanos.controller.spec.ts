import { Test, TestingModule } from '@nestjs/testing';
import { HermanosController } from './hermanos.controller';

describe('HermanosController', () => {
  let controller: HermanosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HermanosController],
    }).compile();

    controller = module.get<HermanosController>(HermanosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
