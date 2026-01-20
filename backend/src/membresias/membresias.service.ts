import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMembresiaDto } from './dto/create-membresia.dto';

@Injectable()
export class MembresiasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMembresiaDto) {
    // upsert “manual”: si ya existe, devuelve el existente
    const existing = await this.prisma.membresia.findFirst({
      where: { hermanoId: dto.hermanoId, agrupacionId: dto.agrupacionId },
    });
    if (existing) return existing;

    return this.prisma.membresia.create({ data: dto });
  }

  findAll() {
    return this.prisma.membresia.findMany({
      orderBy: { id: 'desc' },
      include: {
        hermano: true,
        agrupacion: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.membresia.delete({ where: { id } });
  }
}
