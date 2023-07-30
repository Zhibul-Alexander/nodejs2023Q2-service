import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { AlbumService } from './album.service';

import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

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
    return this.albumService.getAlbum(albumId);
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
    return this.albumService.updateAlbum(albumId, updateDto);
  }

  @Delete(':albumId')
  async deleteAlbum(
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ): Promise<void> {
    return this.albumService.deleteAlbum(albumId);
  }
}
