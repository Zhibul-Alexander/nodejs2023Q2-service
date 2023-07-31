import { Module } from '@nestjs/common';

import { FavoritesTracksController } from './favorites-tracks.controller';
import { FavoritesTracksService } from './favorites-tracks.service';

import { DataModule } from '../data/data.module';

@Module({
  controllers: [FavoritesTracksController],
  providers: [FavoritesTracksService],
  imports: [DataModule],
})
export class FavoritesTracksModule {}
