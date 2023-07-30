import { Module } from '@nestjs/common';

import { FavoritesTracksController } from './favorites-tracks.controller';
import { FavoritesTracksService } from './favorites-tracks.service';

@Module({
  controllers: [FavoritesTracksController],
  providers: [FavoritesTracksService],
})
export class FavoritesTracksModule {}
