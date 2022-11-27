import { PartialType } from '@nestjs/swagger';
import { CreateAnswereDto } from './create-answere.dto';

export class UpdateAnswereDto extends PartialType(CreateAnswereDto) {}
