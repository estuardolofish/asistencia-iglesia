import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateHermanoDto {
  @IsString()
  @MinLength(3)
  nombreCompleto: string;

  @IsOptional()
  @IsString()
  puesto?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
