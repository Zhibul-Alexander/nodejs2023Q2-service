import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from '../users/dto/user.dto';
import { Track } from '../track/dto/track.dto';
import { Artist } from '../artist/dto/artist.dto';
import { Album } from '../album/dto/album.dto';
import { Favorites } from '../favorites/dto/favorites.dto';

import { UpdatePasswordDto } from '../users/dto/update-password.dto';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';

import { ERRORS } from '../constants';

export const users: User[] = [];

export const tracks: Track[] = [];

export const artists: Artist[] = [];

export const albums: Album[] = [];

export const favorites: Favorites = {
  artists: [],
  tracks: [],
  albums: [],
};

@Injectable()
export class DataService {
  public async getAllUsers(): Promise<User[]> {
    return users;
  }

  public async getUser(userId: string): Promise<User | undefined> {
    return users.find((user: User) => user.id === userId);
  }

  public async createUser(newUser: User): Promise<User> {
    users.push(newUser);
    return newUser;
  }

  public async updateUser(
    userId: string,
    updateDto: UpdatePasswordDto,
  ): Promise<User> {
    const userIndex = users.findIndex((user: User) => user.id === userId);
    const user = users[userIndex];
    if (user.password !== updateDto.oldPassword) {
      throw new HttpException(
        ERRORS.OLD_PASSWORD_INCORRECT,
        HttpStatus.FORBIDDEN,
      );
    }
    users[userIndex] = {
      ...user,
      password: updateDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    return users[userIndex];
  }

  public async deleteUser(userId: string): Promise<void> {
    const userIndex = users.findIndex((user: User) => user.id === userId);
    if (userIndex < 0) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    users.splice(userIndex, 1);
  }

  public async getAllTracks(): Promise<Track[]> {
    return tracks;
  }

  public async getTrack(trackId: string): Promise<Track | undefined> {
    return tracks.find((track: Track) => track.id == trackId);
  }

  public async createTrack(newTrack: Track): Promise<Track> {
    tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(
    trackId: string,
    updateDto: UpdateTrackDto,
  ): Promise<Track> {
    const trackIndex = tracks.findIndex((track: Track) => track.id === trackId);
    const newTrack = { ...tracks[trackIndex], ...updateDto };
    tracks[trackIndex] = newTrack;
    return newTrack;
  }

  public async deleteTrack(trackId: string): Promise<void> {
    const trackIndex = tracks.findIndex((track: Track) => track.id === trackId);
    if (trackIndex < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    tracks.splice(trackIndex, 1);

    const indexInFavorites = favorites.tracks.findIndex(
      (favoriteTrackId) => favoriteTrackId === trackId,
    );
    if (indexInFavorites >= 0) {
      favorites.tracks.splice(indexInFavorites, 1);
    }
  }

  public async addTrackToFavorites(trackId: string): Promise<void> {
    favorites.tracks.push(trackId);
  }

  public async deleteTrackFromFavorites(trackId: string): Promise<void> {
    const indexInFavorites = favorites.tracks.findIndex(
      (favoriteTrackId) => favoriteTrackId === trackId,
    );
    if (indexInFavorites < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND_IN_FAVORITES);
    }
    favorites.tracks.splice(indexInFavorites, 1);
  }

  public async getAllArtists(): Promise<Artist[]> {
    return artists;
  }

  public async getArtist(artistId: string): Promise<Artist | undefined> {
    return artists.find((artist: Artist) => artist.id == artistId);
  }

  public async createArtist(newArtist: Artist): Promise<Artist> {
    artists.push(newArtist);
    return newArtist;
  }

  public async updateArtist(
    artistId: string,
    updateDto: UpdateArtistDto,
  ): Promise<Artist> {
    const indexArtist = artists.findIndex(
      (artist: Artist) => artist.id === artistId,
    );
    const newArtist = { ...artists[indexArtist], ...updateDto };
    artists[indexArtist] = newArtist;
    return newArtist;
  }

  public async deleteArtist(artistId: string): Promise<void> {
    const indexArtist = artists.findIndex(
      (artist: Artist) => artist.id === artistId,
    );
    if (indexArtist < 0) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    artists.splice(indexArtist, 1);

    const indexInFavourites = favorites.artists.findIndex(
      (favouriteArtistId) => favouriteArtistId === artistId,
    );
    if (indexInFavourites >= 0) {
      favorites.artists.splice(indexInFavourites, 1);
    }

    tracks.forEach((track: Track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });

    albums.forEach((album: Album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }

  public async addArtistToFavorites(artistId: string): Promise<void> {
    favorites.artists.push(artistId);
  }

  public async deleteArtistFromFavorites(artistId: string): Promise<void> {
    const indexInFavourites = favorites.artists.findIndex(
      (favouriteArtistId) => favouriteArtistId === artistId,
    );
    if (indexInFavourites < 0) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND_IN_FAVORITES);
    }
    favorites.artists.splice(indexInFavourites, 1);
  }

  public async getAllAlbums(): Promise<Album[]> {
    return albums;
  }

  public async getAlbum(albumId: string): Promise<Album | undefined> {
    return albums.find((album: Album) => album.id == albumId);
  }

  public async createAlbum(newAlbum: Album): Promise<Album> {
    albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(
    albumId: string,
    updateDto: UpdateAlbumDto,
  ): Promise<Album> {
    const albumIndex = albums.findIndex((album: Album) => album.id === albumId);
    const newAlbum = { ...albums[albumIndex], ...updateDto };
    albums[albumIndex] = newAlbum;
    return newAlbum;
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    const albumIndex = albums.findIndex((album: Album) => album.id === albumId);
    if (albumIndex < 0) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    albums.splice(albumIndex, 1);

    const indexInFavourites = favorites.albums.findIndex(
      (favoriteAlbumId) => favoriteAlbumId === albumId,
    );
    if (indexInFavourites >= 0) {
      favorites.albums.splice(indexInFavourites, 1);
    }

    tracks.forEach((track: Track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  public async addAlbumToFavorites(albumId: string): Promise<void> {
    favorites.albums.push(albumId);
  }

  public async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    const indexInFavorites = favorites.albums.findIndex(
      (favoriteAlbumId) => favoriteAlbumId === albumId,
    );
    if (indexInFavorites < 0) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND_IN_FAVORITES);
    }
    favorites.albums.splice(indexInFavorites, 1);
  }

  public async getFavorites(): Promise<Favorites> {
    return favorites;
  }
}
