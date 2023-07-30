import { Controller, Post, Param, ParseUUIDPipe, Delete } from '@nestjs/common';

import { FavoritesTracksService } from './favorites-tracks.service';

@Controller()
export class FavoritesTracksController {
  constructor(private favoritesTracksService: FavoritesTracksService) {}

  @Post(':trackId')
  async addToFavorites(
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ): Promise<void> {
    return this.favoritesTracksService.addToFavorites(trackId);
  }

  @Delete(':trackId')
  async deleteFromFavorites(
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ): Promise<void> {
    return this.favoritesTracksService.deleteFromFavorites(trackId);
  }
}
