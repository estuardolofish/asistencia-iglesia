import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHermanoDto } from './dto/create-hermano.dto';
import { UpdateHermanoDto } from './dto/update-hermano.dto';

@Injectable()
export class HermanosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateHermanoDto) {
    return this.prisma.hermano.create({ data: dto });
  }

  findAll() {
    return this.prisma.hermano.findMany({
      orderBy: [{ apellidos: 'asc' }, { nombres: 'asc' }],
      include: {
        membresias: { include: { agrupacion: true } },
      },
    });
  }

  search(q: string) {
    const term = q?.trim();
    if (!term) return [];

    return this.prisma.hermano.findMany({
      where: {
        activo: true,
        OR: [
          { nombres: { contains: term, mode: 'insensitive' } },
          { apellidos: { contains: term, mode: 'insensitive' } },
        ],
      },
      take: 20,
      orderBy: [{ apellidos: 'asc' }, { nombres: 'asc' }],
      include: {
        membresias: { include: { agrupacion: true } },
      },
    });
  }

  update(id: number, dto: UpdateHermanoDto) {
    return this.prisma.hermano.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.hermano.delete({ where: { id } });
  }
}
