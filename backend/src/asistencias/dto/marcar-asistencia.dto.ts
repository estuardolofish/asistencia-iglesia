import { IsInt, Min } from 'class-validator';

export class MarcarAsistenciaDto {
  @IsInt()
  @Min(1)
  actividadId: number;

  @IsInt()
  @Min(1)
  hermanoId: number;
}
