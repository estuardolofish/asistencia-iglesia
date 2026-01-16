import { Module } from '@nestjs/common';
import { AgrupacionesController } from './agrupaciones.controller';
import { AgrupacionesService } from './agrupaciones.service';

@Module({
  controllers: [AgrupacionesController],
  providers: [AgrupacionesService]
})
export class AgrupacionesModule {}
