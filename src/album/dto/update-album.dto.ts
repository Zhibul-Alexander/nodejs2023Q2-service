import { IsOptional, IsInt, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artist?: string | null;
}
