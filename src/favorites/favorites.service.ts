import { Injectable } from '@nestjs/common';

import { DataService } from '../data/data.service';

import { FavoritesResponse } from './dto/favorites-response.dto';

@Injectable()
export class FavoritesService {
  constructor(private dataService: DataService) {}

  public async getAllFavorites(): Promise<FavoritesResponse> {
    const {
      artists: artistsIds,
      albums: albumsIds,
      tracks: tracksIds,
    } = await this.dataService.getFavorites();

    return {
      artists: await Promise.all(
        artistsIds.map(async (artistId) =>
          this.dataService.getArtist(artistId),
        ),
      ),
      albums: await Promise.all(
        albumsIds.map(async (albumId) => this.dataService.getAlbum(albumId)),
      ),
      tracks: await Promise.all(
        tracksIds.map(async (trackId) => this.dataService.getTrack(trackId)),
      ),
    };
  }
}
