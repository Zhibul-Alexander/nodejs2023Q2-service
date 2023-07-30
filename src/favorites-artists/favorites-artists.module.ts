import { Module } from '@nestjs/common';

import { FavoritesArtistsController } from './favorites-artists.controller';
import { FavoritesArtistsService } from './favorites-artists.service';

@Module({
  controllers: [FavoritesArtistsController],
  providers: [FavoritesArtistsService],
})
export class FavoritesArtistsModule {}
