import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsNotEmpty({ message: ' firstname is required' })
  firstname: string;
  @IsNotEmpty({ message: 'lastname is required' })
  lastname: string;
  @IsNotEmpty({ message: 'role is required' })
  role: string;
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}

export default CreateUserDto;
