import { Injectable, NotFoundException } from '@nestjs/common';

import { albums, favorites } from '../store';

import { Album } from '../album/dto/album.dto';

import { ERRORS } from '../constants';

@Injectable()
export class FavoritesAlbumsService {
  public async addToFavorites(albumId: string): Promise<void> {
    const album = albums.find((album: Album) => album.id === albumId);
    if (!album) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    favorites.albums.push(albumId);
  }

  public async deleteFromFavorites(albumId: string): Promise<void> {
    const albumIndex = albums.findIndex((album: Album) => album.id === albumId);
    if (albumIndex < 0) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    const favoriteAlbumIndex = favorites.albums.findIndex(
      (favoriteAlbumId) => favoriteAlbumId === albumId,
    );
    if (favoriteAlbumIndex < 0) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND_IN_FAVORITES);
    }
    favorites.albums.splice(albumIndex, 1);
  }
}
