import {
  IsNotEmpty,
  IsDefined,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsNotEmpty()
  @IsDefined()
  @IsInt()
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;
}
