import {
  Controller,
  Post,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FavoritesAlbumsService } from './favorites-albums.service';

@ApiTags('favs/album')
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
  @HttpCode(204)
  async deleteFromFavorites(
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ): Promise<void> {
    return this.favoritesAlbumsService.deleteFromFavorites(albumId);
  }
}
