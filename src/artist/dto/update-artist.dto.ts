import { IsDefined, IsOptional, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsDefined()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
