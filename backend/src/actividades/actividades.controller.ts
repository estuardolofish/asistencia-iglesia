import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly service: ActividadesService) {}

  @Post()
  create(@Body() dto: CreateActividadDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('abierta')
  findOpen() {
    return this.service.findOpen();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateActividadDto,
  ) {
    return this.service.update(id, dto);
  }

  @Patch(':id/cerrar')
  close(@Param('id', ParseIntPipe) id: number) {
    return this.service.close(id);
  }
}
