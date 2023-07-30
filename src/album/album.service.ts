import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { albums } from '../store';

import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { ERRORS } from '../constants';

@Injectable()
export class AlbumService {
  public async getAllAlbums(): Promise<Album[]> {
    return albums;
  }

  public async getAlbum(albumId: string): Promise<Album> {
    const album = albums.find((album: Album) => album.id === albumId);
    if (!album) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    return album;
  }

  public async createAlbum(createDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      ...createDto,
      id: uuidv4(),
      artistId: null,
    };
    albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(
    albumId: string,
    updateDto: UpdateAlbumDto,
  ): Promise<Album> {
    const albumIndex = albums.findIndex((album: Album) => album.id === albumId);
    if (albumIndex < 0) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    albums[albumIndex] = { ...albums[albumIndex], ...updateDto };
    return albums[albumIndex];
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    const albumIndex = albums.findIndex((album: Album) => album.id === albumId);
    if (albumIndex < 0) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    albums.splice(albumIndex, 1);
  }
}
