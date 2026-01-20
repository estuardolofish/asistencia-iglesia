import { PartialType } from '@nestjs/mapped-types';
import { CreateAgrupacionDto } from './create-agrupacion.dto';

export class UpdateAgrupacionDto extends PartialType(CreateAgrupacionDto) {}
