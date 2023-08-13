import { IsNotEmpty, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  login: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;
}
