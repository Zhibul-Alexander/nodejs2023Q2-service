import { Injectable } from '@nestjs/common';

import { favorites, artists, albums, tracks } from '../store';

import { FavoritesResponse } from './dto/favorites-response.dto';
import { Favorites } from './dto/favorites.dto';
import { Artist } from '../artist/dto/artist.dto';
import { Album } from '../album/dto/album.dto';
import { Track } from '../track/dto/track.dto';

@Injectable()
export class FavoritesService {
  public async getAllFavorites(): Promise<FavoritesResponse[]> {
    return favorites.map((favorite: Favorites) => {
      return {
        artists: favorite.artists.map((artistId) =>
          artists.find((artist: Artist) => artist.id === artistId),
        ),
        albums: favorite.albums.map((albumId) =>
          albums.find((album: Album) => album.id === albumId),
        ),
        tracks: favorite.tracks.map((trackId) =>
          tracks.find((track: Track) => track.id === trackId),
        ),
      };
    });
  }
}
