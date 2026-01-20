import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AgrupacionesService } from './agrupaciones.service';
import { CreateAgrupacionDto } from './dto/create-agrupacion.dto';
import { UpdateAgrupacionDto } from './dto/update-agrupacion.dto';

@Controller('agrupaciones')
export class AgrupacionesController {
  constructor(private readonly service: AgrupacionesService) {}

  @Post()
  create(@Body() dto: CreateAgrupacionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAgrupacionDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
