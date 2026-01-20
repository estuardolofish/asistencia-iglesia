import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportesService {
  constructor(private readonly prisma: PrismaService) {}

  async getDataForActividad(actividadId: number) {
    const actividad = await this.prisma.actividad.findUnique({
      where: { id: actividadId },
    });
    if (!actividad) throw new NotFoundException('Actividad no encontrada');

    // asistencias marcadas (set de hermanoId)
    const asistencias = await this.prisma.asistencia.findMany({
      where: { actividadId },
      select: { hermanoId: true },
    });
    const presentesSet = new Set(asistencias.map((a) => a.hermanoId));

    // agrupaciones con sus miembros
    const agrupaciones = await this.prisma.agrupacion.findMany({
      where: { activa: true },
      orderBy: { nombre: 'asc' },
      include: {
        membresias: {
          include: {
            hermano: true,
          },
        },
      },
    });

    const reporte = agrupaciones.map((ag) => {
      const miembros = ag.membresias
        .map((m) => m.hermano)
        .filter((h) => h.activo)
        .sort((a, b) =>
          (a.apellidos + a.nombres).localeCompare(b.apellidos + b.nombres),
        );

      const presentes = miembros.filter((h) => presentesSet.has(h.id));
      const ausentes = miembros.filter((h) => !presentesSet.has(h.id));

      return {
        agrupacion: ag.nombre,
        presentes,
        ausentes,
      };
    });

    return { actividad, reporte };
  }
}
