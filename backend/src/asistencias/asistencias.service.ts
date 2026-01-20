import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MarcarAsistenciaDto } from './dto/marcar-asistencia.dto';

@Injectable()
export class AsistenciasService {
  constructor(private readonly prisma: PrismaService) {}

  async marcar(dto: MarcarAsistenciaDto) {
    // idempotente: si ya está marcada, devolver el registro
    const existing = await this.prisma.asistencia.findFirst({
      where: { actividadId: dto.actividadId, hermanoId: dto.hermanoId },
    });
    if (existing) return { ...existing, yaExistia: true };

    const created = await this.prisma.asistencia.create({
      data: {
        actividadId: dto.actividadId,
        hermanoId: dto.hermanoId,
      },
    });

    return { ...created, yaExistia: false };
  }

  listByActividad(actividadId: number) {
    return this.prisma.asistencia.findMany({
      where: { actividadId },
      include: { hermano: true },
      orderBy: { marcadaEn: 'asc' },
    });
  }
}
