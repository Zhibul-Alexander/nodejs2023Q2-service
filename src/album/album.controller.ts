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
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AlbumService } from './album.service';

import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { ERRORS } from '../constants/index';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':albumId')
  async getAlbum(
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ): Promise<Album> {
    const album = await this.albumService.getAlbum(albumId);
    if (!album) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    return album;
  }

  @Post()
  async createAlbum(@Body() createDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(createDto);
  }

  @Put(':albumId')
  async updateAlbum(
    @Body() updateDto: UpdateAlbumDto,
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ): Promise<Album> {
    const album = await this.albumService.updateAlbum(albumId, updateDto);
    if (!album) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    return album;
  }

  @Delete(':albumId')
  @HttpCode(204)
  async deleteAlbum(
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ): Promise<void> {
    return this.albumService.deleteAlbum(albumId);
  }
}
