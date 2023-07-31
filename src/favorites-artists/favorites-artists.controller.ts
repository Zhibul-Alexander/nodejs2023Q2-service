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

import { FavoritesArtistsService } from './favorites-artists.service';

import { ERRORS } from '../constants/index';

@ApiTags('favs/artist')
@Controller()
export class FavoritesArtistsController {
  constructor(private favoritesArtistsService: FavoritesArtistsService) {}

  @Post(':artistId')
  async addToFavorites(
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ): Promise<boolean> {
    const addedToFavorites = await this.favoritesArtistsService.addToFavorites(
      artistId,
    );
    if (!addedToFavorites) {
      throw new UnprocessableEntityException(ERRORS.ARTIST_NOT_FOUND);
    }
    return addedToFavorites;
  }

  @Delete(':artistId')
  @HttpCode(204)
  async deleteFromFavorites(
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ): Promise<boolean> {
    const deletedToFavorites =
      await this.favoritesArtistsService.deleteFromFavorites(artistId);
    if (!deletedToFavorites) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    return deletedToFavorites;
  }
}
