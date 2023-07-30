import { Injectable } from '@nestjs/common';

import { favorites, artists, albums, tracks } from '../store';

import { FavoritesResponse } from './dto/favorites-response.dto';
import { Artist } from '../artist/dto/artist.dto';
import { Album } from '../album/dto/album.dto';
import { Track } from '../track/dto/track.dto';

@Injectable()
export class FavoritesService {
  public async getAllFavorites(): Promise<FavoritesResponse> {
    return {
      ...favorites,
      artists: favorites.artists.map((artistId) =>
        artists.find((artist: Artist) => artist.id === artistId),
      ),
      albums: favorites.albums.map((albumId) =>
        albums.find((album: Album) => album.id === albumId),
      ),
      tracks: favorites.tracks.map((trackId) =>
        tracks.find((track: Track) => track.id === trackId),
      ),
    };
  }
}
