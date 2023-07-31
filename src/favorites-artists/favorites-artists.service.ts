import { Injectable, NotFoundException } from '@nestjs/common';

import { DataService } from '../data/data.service';

import { ERRORS } from '../constants';

@Injectable()
export class FavoritesArtistsService {
  constructor(private dataService: DataService) {}

  public async addToFavorites(artistId: string): Promise<void> {
    const artist = this.dataService.getArtist(artistId);
    if (!artist) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    await this.dataService.addArtistToFavorites(artistId);
  }

  public async deleteFromFavorites(artistId: string): Promise<void> {
    const artist = this.dataService.getArtist(artistId);
    if (!artist) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    await this.dataService.deleteArtistFromFavorites(artistId);
  }
}
