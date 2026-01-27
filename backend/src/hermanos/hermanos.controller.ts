import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HermanosService } from './hermanos.service';
import { CreateHermanoDto } from './dto/create-hermano.dto';
import { UpdateHermanoDto } from './dto/update-hermano.dto';

@Controller('hermanos')
export class HermanosController {
  constructor(private readonly service: HermanosService) {}

  @Post()
  create(@Body() dto: CreateHermanoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // buscar por nombre completo
  @Get('buscar')
  search(@Query('q') q: string) {
    return this.service.searchByNombreCompleto(q);
  }

  // buscar directo por id
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHermanoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
