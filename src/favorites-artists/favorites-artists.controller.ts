import {
  Controller,
  Post,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { FavoritesArtistsService } from './favorites-artists.service';

@Controller()
export class FavoritesArtistsController {
  constructor(private favoritesArtistsService: FavoritesArtistsService) {}

  @Post(':artistId')
  async addToFavorites(
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ): Promise<void> {
    return this.favoritesArtistsService.addToFavorites(artistId);
  }

  @Delete(':artistId')
  @HttpCode(204)
  async deleteFromFavorites(
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ): Promise<void> {
    return this.favoritesArtistsService.deleteFromFavorites(artistId);
  }
}
