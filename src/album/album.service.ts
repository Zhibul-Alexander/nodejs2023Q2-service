import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DataService } from '../data/data.service';

import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private dataService: DataService) {}

  public async getAllAlbums(): Promise<Album[]> {
    return this.dataService.getAllAlbums();
  }

  public async getAlbum(albumId: string): Promise<Album> {
    const album = await this.dataService.getAlbum(albumId);
    if (!album) {
      return;
    }
    return album;
  }

  public async createAlbum(createDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      artistId: null,
      ...createDto,
    };
    return this.dataService.createAlbum(newAlbum);
  }

  public async updateAlbum(
    albumId: string,
    updateDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.dataService.getAlbum(albumId);
    if (!album) {
      return;
    }
    return this.dataService.updateAlbum(albumId, updateDto);
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    return this.dataService.deleteAlbum(albumId);
  }
}
