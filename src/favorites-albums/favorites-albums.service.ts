import { Injectable } from '@nestjs/common';

import { DataService } from '../data/data.service';

@Injectable()
export class FavoritesAlbumsService {
  constructor(private dataService: DataService) {}

  public async addToFavorites(albumId: string): Promise<boolean> {
    const album = await this.dataService.getAlbum(albumId);
    if (!album) {
      return false;
    }
    return this.dataService.addAlbumToFavorites(albumId);
  }

  public async deleteFromFavorites(
    albumId: string,
  ): Promise<boolean | undefined> {
    const album = await this.dataService.getAlbum(albumId);
    if (!album) {
      return;
    }
    await this.dataService.deleteAlbumFromFavorites(albumId);
    return true;
  }
}
