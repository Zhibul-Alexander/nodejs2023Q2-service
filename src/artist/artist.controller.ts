import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { ArtistService } from './artist.service';

import { Artist } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':artistId')
  async getArtist(
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ): Promise<Artist> {
    return this.artistService.getArtist(artistId);
  }

  @Post()
  async createArtist(@Body() createDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(createDto);
  }

  @Put(':artistId')
  async updateArtist(
    @Body() updateDto: UpdateArtistDto,
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ): Promise<Artist> {
    return this.artistService.updateArtist(artistId, updateDto);
  }

  @Delete(':artistId')
  @HttpCode(204)
  async deleteArtist(
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ): Promise<void> {
    return this.artistService.deleteArtist(artistId);
  }
}
