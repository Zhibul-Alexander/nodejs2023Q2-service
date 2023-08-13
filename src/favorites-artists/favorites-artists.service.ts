import { Injectable } from '@nestjs/common';

import { DataService } from '../data/data.service';

@Injectable()
export class FavoritesArtistsService {
  constructor(private dataService: DataService) {}

  public async addToFavorites(artistId: string): Promise<boolean> {
    const artist = await this.dataService.getArtist(artistId);
    if (!artist) {
      return false;
    }
    return this.dataService.addArtistToFavorites(artistId);
  }

  public async deleteFromFavorites(
    artistId: string,
  ): Promise<boolean | undefined> {
    const artist = await this.dataService.getArtist(artistId);
    if (!artist) {
      return undefined;
    }
    await this.dataService.deleteArtistFromFavorites(artistId);
    return true;
  }
}
