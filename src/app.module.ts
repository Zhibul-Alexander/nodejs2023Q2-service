import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoritesAlbumsModule } from './favorites-albums/favorites-albums.module';
import { FavoritesArtistsModule } from './favorites-artists/favorites-artists.module';
import { FavoritesTracksModule } from './favorites-tracks/favorites-tracks.module';

@Module({
  imports: [
    UsersModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    FavoritesAlbumsModule,
    RouterModule.register([
      {
        path: 'favs',
        module: FavoritesModule,
        children: [
          {
            path: 'album',
            module: FavoritesAlbumsModule,
          },
          {
            path: 'artist',
            module: FavoritesArtistsModule,
          },
          {
            path: 'track',
            module: FavoritesTracksModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
