import { Module } from '@nestjs/common';

import { FavoritesAlbumsController } from './favorites-albums.controller';
import { FavoritesAlbumsService } from './favorites-albums.service';

@Module({
  controllers: [FavoritesAlbumsController],
  providers: [FavoritesAlbumsService],
})
export class FavoritesAlbumsModule {}
