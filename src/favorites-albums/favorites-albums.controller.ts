import {
  Controller,
  Post,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FavoritesAlbumsService } from './favorites-albums.service';

import { ERRORS } from '../constants/index';

@ApiTags('favs/album')
@Controller()
export class FavoritesAlbumsController {
  constructor(private favoritesAlbumsService: FavoritesAlbumsService) {}

  @Post(':albumId')
  async addToFavorites(
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ): Promise<boolean> {
    const addedToFavorites = await this.favoritesAlbumsService.addToFavorites(
      albumId,
    );
    if (!addedToFavorites) {
      throw new UnprocessableEntityException(ERRORS.ALBUM_NOT_FOUND);
    }
    return addedToFavorites;
  }

  @Delete(':albumId')
  @HttpCode(204)
  async deleteFromFavorites(
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ): Promise<boolean> {
    const deletedFromFavorites =
      await this.favoritesAlbumsService.deleteFromFavorites(albumId);
    if (!deletedFromFavorites) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    return true;
  }
}
