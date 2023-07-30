import { IsNotEmpty, IsDefined } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsDefined()
  oldPassword: string;

  @IsNotEmpty()
  @IsDefined()
  newPassword: string;
}
