import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';

@Injectable()
export class ActividadesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateActividadDto) {
    return this.prisma.actividad.create({
      data: {
        nombre: dto.nombre,
        fechaHora: new Date(dto.fechaHora),
        abierta: dto.abierta ?? true,
      },
    });
  }

  findAll() {
    return this.prisma.actividad.findMany({
      orderBy: { fechaHora: 'desc' },
    });
  }

  findOpen() {
    return this.prisma.actividad.findFirst({
      where: { abierta: true },
      orderBy: { fechaHora: 'desc' },
    });
  }

  update(id: number, dto: UpdateActividadDto) {
    return this.prisma.actividad.update({
      where: { id },
      data: {
        ...(dto.nombre != null ? { nombre: dto.nombre } : {}),
        ...(dto.fechaHora != null
          ? { fechaHora: new Date(dto.fechaHora) }
          : {}),
        ...(dto.abierta != null ? { abierta: dto.abierta } : {}),
      },
    });
  }

  close(id: number) {
    return this.prisma.actividad.update({
      where: { id },
      data: { abierta: false },
    });
  }
}
