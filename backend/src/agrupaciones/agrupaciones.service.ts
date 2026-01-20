import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgrupacionDto } from './dto/create-agrupacion.dto';
import { UpdateAgrupacionDto } from './dto/update-agrupacion.dto';

@Injectable()
export class AgrupacionesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAgrupacionDto) {
    return this.prisma.agrupacion.create({ data: dto });
  }

  findAll() {
    return this.prisma.agrupacion.findMany({
      orderBy: { nombre: 'asc' },
      include: {
        membresias: { include: { hermano: true } },
      },
    });
  }

  update(id: number, dto: UpdateAgrupacionDto) {
    return this.prisma.agrupacion.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.agrupacion.delete({ where: { id } });
  }
}
