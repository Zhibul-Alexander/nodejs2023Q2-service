import { Track } from '../track/dto/track.dto';
import { Artist } from '../artist/dto/artist.dto';
import { Album } from '../album/dto/album.dto';
import { Favorites } from '../favorites/dto/favorites.dto';

export const tracks: Track[] = [];

export const artists: Artist[] = [];

export const albums: Album[] = [];

export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
