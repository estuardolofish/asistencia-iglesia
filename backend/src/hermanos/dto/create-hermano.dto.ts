import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateHermanoDto {
  @IsString()
  @MinLength(2)
  nombres: string;

  @IsString()
  @MinLength(2)
  apellidos: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
