import { Module } from '@nestjs/common';

import { FavoritesArtistsController } from './favorites-artists.controller';
import { FavoritesArtistsService } from './favorites-artists.service';

import { DataModule } from '../data/data.module';

@Module({
  controllers: [FavoritesArtistsController],
  providers: [FavoritesArtistsService],
  imports: [DataModule],
})
export class FavoritesArtistsModule {}
