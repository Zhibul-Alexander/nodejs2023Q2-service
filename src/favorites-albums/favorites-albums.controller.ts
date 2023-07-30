import { Controller, Post, Param, ParseUUIDPipe, Delete } from '@nestjs/common';

import { FavoritesAlbumsService } from './favorites-albums.service';

@Controller()
export class FavoritesAlbumsController {
  constructor(private favoritesAlbumsService: FavoritesAlbumsService) {}

  @Post(':albumId')
  async addToFavorites(
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ): Promise<void> {
    return this.favoritesAlbumsService.addToFavorites(albumId);
  }

  @Delete(':albumId')
  async deleteFromFavorites(
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ): Promise<void> {
    return this.favoritesAlbumsService.deleteFromFavorites(albumId);
  }
}
