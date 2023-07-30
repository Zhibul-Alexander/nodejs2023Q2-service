import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
