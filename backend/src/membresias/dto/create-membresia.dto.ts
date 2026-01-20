import { IsInt, Min } from 'class-validator';

export class CreateMembresiaDto {
  @IsInt()
  @Min(1)
  hermanoId: number;

  @IsInt()
  @Min(1)
  agrupacionId: number;
}
