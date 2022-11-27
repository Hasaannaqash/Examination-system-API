import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  optionOne: string;

  @IsString()
  @IsNotEmpty()
  optionTwo: string;

  @IsString()
  @IsNotEmpty()
  optionThree: string;

  @IsString()
  @IsNotEmpty()
  optionFour: string;

  @IsString()
  @IsNotEmpty()
  correctOption: number;

  @IsString()
  @IsNotEmpty()
  marks: number;

  @IsNotEmpty()
  examId: number;
}
