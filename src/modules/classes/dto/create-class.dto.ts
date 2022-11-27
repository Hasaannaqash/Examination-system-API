import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Class Name is required' })
  name: string;
  @IsNotEmpty({ message: 'Class description is required' })
  description: string;
  instructorId: number;
}
