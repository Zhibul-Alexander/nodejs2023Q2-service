import { Module } from '@nestjs/common';

import { FavoritesAlbumsController } from './favorites-albums.controller';
import { FavoritesAlbumsService } from './favorites-albums.service';

import { DataModule } from '../data/data.module';

@Module({
  controllers: [FavoritesAlbumsController],
  providers: [FavoritesAlbumsService],
  imports: [DataModule],
})
export class FavoritesAlbumsModule {}
