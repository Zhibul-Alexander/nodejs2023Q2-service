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

import { FavoritesTracksService } from './favorites-tracks.service';

import { ERRORS } from '../constants/index';

@ApiTags('favs/track')
@Controller()
export class FavoritesTracksController {
  constructor(private favoritesTracksService: FavoritesTracksService) {}

  @Post(':trackId')
  async addToFavorites(
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ): Promise<boolean> {
    const addedToFavorites = await this.favoritesTracksService.addToFavorites(
      trackId,
    );
    if (!addedToFavorites) {
      throw new UnprocessableEntityException(ERRORS.TRACK_NOT_FOUND);
    }
    return addedToFavorites;
  }

  @Delete(':trackId')
  @HttpCode(204)
  async deleteFromFavorites(
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ): Promise<boolean> {
    const deletedToFavorites =
      this.favoritesTracksService.deleteFromFavorites(trackId);
    if (!deletedToFavorites) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    return true;
  }
}
