import {
  IsNotEmpty,
  IsDefined,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsNotEmpty()
  @IsDefined()
  @IsInt()
  @Min(0)
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;
}
