import { Injectable, NotFoundException } from '@nestjs/common';

import { artists, favorites } from '../store';

import { Artist } from '../artist/dto/artist.dto';

import { ERRORS } from '../constants';

@Injectable()
export class FavoritesArtistsService {
  public async addToFavorites(artistId: string): Promise<void> {
    const artist = artists.find((artist: Artist) => artist.id === artistId);
    if (!artist) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    favorites.artists.push(artistId);
  }

  public async deleteFromFavorites(artistId: string): Promise<void> {
    const artistIndex = artists.findIndex(
      (artist: Artist) => artist.id === artistId,
    );
    if (artistIndex < 0) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    const favoriteArtistIndex = favorites.artists.findIndex(
      (favoriteArtistId) => favoriteArtistId === artistId,
    );
    if (favoriteArtistIndex < 0) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND_IN_FAVORITES);
    }
    favorites.artists.splice(artistIndex, 1);
  }
}
