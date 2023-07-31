import {
  Controller,
  Post,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FavoritesArtistsService } from './favorites-artists.service';

@ApiTags('favs/artist')
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
