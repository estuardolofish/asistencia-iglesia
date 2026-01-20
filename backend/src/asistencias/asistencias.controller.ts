import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { MarcarAsistenciaDto } from './dto/marcar-asistencia.dto';

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly service: AsistenciasService) {}

  @Post('marcar')
  marcar(@Body() dto: MarcarAsistenciaDto) {
    return this.service.marcar(dto);
  }

  @Get('actividad/:actividadId')
  listByActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.service.listByActividad(actividadId);
  }
}
