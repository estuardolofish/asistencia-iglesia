import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HermanosModule } from './hermanos/hermanos.module';
import { AgrupacionesModule } from './agrupaciones/agrupaciones.module';
import { ActividadesModule } from './actividades/actividades.module';
import { AsistenciasModule } from './asistencias/asistencias.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [PrismaModule, HermanosModule, AgrupacionesModule, ActividadesModule, AsistenciasModule, ReportesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
