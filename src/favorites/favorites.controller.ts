import { Controller, Get } from '@nestjs/common';

import { FavoritesService } from './favorites.service';

import { FavoritesResponse } from './dto/favorites-response.dto';

@Controller()
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites(): Promise<FavoritesResponse[]> {
    return this.favoritesService.getAllFavorites();
  }
}
