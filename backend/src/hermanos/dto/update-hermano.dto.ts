import { PartialType } from '@nestjs/mapped-types';
import { CreateHermanoDto } from './create-hermano.dto';

export class UpdateHermanoDto extends PartialType(CreateHermanoDto) {}
