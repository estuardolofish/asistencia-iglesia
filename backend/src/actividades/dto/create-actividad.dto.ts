import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateActividadDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  // ISO string: "2026-01-16T18:00:00.000Z" o con offset
  @IsDateString()
  fechaHora: string;

  @IsOptional()
  @IsBoolean()
  abierta?: boolean;
}
