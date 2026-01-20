import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import express from 'express';
import PDFDocument from 'pdfkit';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly service: ReportesService) {}

  @Get('actividad/:id.pdf')
  async reporteActividad(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: express.Response,
  ) {
    const { actividad, reporte } = await this.service.getDataForActividad(id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename="reporte-actividad-${id}.pdf"`,
    );

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    // Header
    doc.fontSize(18).text('Reporte de Asistencia', { align: 'center' });
    doc.moveDown(0.5);

    doc.fontSize(12).text(`Actividad: ${actividad.nombre}`);
    doc.text(`Fecha/Hora: ${new Date(actividad.fechaHora).toLocaleString()}`);
    doc.moveDown(1);

    // Body por agrupación
    for (const item of reporte) {
      doc.fontSize(14).text(item.agrupacion, { underline: true });
      doc.moveDown(0.3);

      doc.fontSize(12).text(`Presentes (${item.presentes.length})`);
      if (item.presentes.length === 0) {
        doc.fontSize(10).text('- (ninguno)');
      } else {
        for (const h of item.presentes) {
          doc.fontSize(10).text(`- ${h.apellidos}, ${h.nombres}`);
        }
      }

      doc.moveDown(0.4);
      doc.fontSize(12).text(`Ausentes (${item.ausentes.length})`);
      if (item.ausentes.length === 0) {
        doc.fontSize(10).text('- (ninguno)');
      } else {
        for (const h of item.ausentes) {
          doc.fontSize(10).text(`- ${h.apellidos}, ${h.nombres}`);
        }
      }

      doc.moveDown(1);
    }

    doc.end();
  }
}
