import { Module } from '@nestjs/common';
import { HermanosController } from './hermanos.controller';
import { HermanosService } from './hermanos.service';

@Module({
  controllers: [HermanosController],
  providers: [HermanosService]
})
export class HermanosModule {}
