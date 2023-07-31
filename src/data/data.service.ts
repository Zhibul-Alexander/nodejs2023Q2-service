import { Injectable, NotFoundException } from '@nestjs/common';

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

@Injectable()
export class DataService {
  private users: User[] = [];

  private tracks: Track[] = [];

  private artists: Artist[] = [];

  private albums: Album[] = [];

  private favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };

  public async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  public async getUser(userId: string): Promise<User | undefined> {
    return this.users.find((user: User) => user.id === userId);
  }

  public async createUser(newUser: User): Promise<User> {
    this.users.push(newUser);
    return newUser;
  }

  public async updateUser(
    userId: string,
    updateDto: UpdatePasswordDto,
  ): Promise<User> {
    const userIndex = this.users.findIndex((user: User) => user.id === userId);
    const user = this.users[userIndex];
    this.users[userIndex] = {
      ...user,
      password: updateDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    return this.users[userIndex];
  }

  public async deleteUser(userId: string): Promise<void> {
    const userIndex = this.users.findIndex((user: User) => user.id === userId);
    if (userIndex < 0) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    this.users.splice(userIndex, 1);
  }

  public async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  public async getTrack(trackId: string): Promise<Track | undefined> {
    return this.tracks.find((track: Track) => track.id == trackId);
  }

  public async createTrack(newTrack: Track): Promise<Track> {
    this.tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(
    trackId: string,
    updateDto: UpdateTrackDto,
  ): Promise<Track> {
    const trackIndex = this.tracks.findIndex(
      (track: Track) => track.id === trackId,
    );
    const newTrack = { ...this.tracks[trackIndex], ...updateDto };
    this.tracks[trackIndex] = newTrack;
    return newTrack;
  }

  public async deleteTrack(trackId: string): Promise<boolean> {
    const trackIndex = this.tracks.findIndex(
      (track: Track) => track.id === trackId,
    );
    if (trackIndex < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    this.tracks.splice(trackIndex, 1);

    const indexInFavorites = this.favorites.tracks.findIndex(
      (favoriteTrackId) => favoriteTrackId === trackId,
    );
    if (indexInFavorites >= 0) {
      this.favorites.tracks.splice(indexInFavorites, 1);
      return true;
    }
  }

  public async addTrackToFavorites(trackId: string): Promise<boolean> {
    this.favorites.tracks.push(trackId);
    return true;
  }

  public async deleteTrackFromFavorites(trackId: string): Promise<boolean> {
    const indexInFavorites = this.favorites.tracks.findIndex(
      (favoriteTrackId) => favoriteTrackId === trackId,
    );
    if (indexInFavorites < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND_IN_FAVORITES);
    }
    this.favorites.tracks.splice(indexInFavorites, 1);
    return true;
  }

  public async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  public async getArtist(artistId: string): Promise<Artist | undefined> {
    return this.artists.find((artist: Artist) => artist.id == artistId);
  }

  public async createArtist(newArtist: Artist): Promise<Artist> {
    this.artists.push(newArtist);
    return newArtist;
  }

  public async updateArtist(
    artistId: string,
    updateDto: UpdateArtistDto,
  ): Promise<Artist> {
    const indexArtist = this.artists.findIndex(
      (artist: Artist) => artist.id === artistId,
    );
    const newArtist = { ...this.artists[indexArtist], ...updateDto };
    this.artists[indexArtist] = newArtist;
    return newArtist;
  }

  public async deleteArtist(artistId: string): Promise<void> {
    const indexArtist = this.artists.findIndex(
      (artist: Artist) => artist.id === artistId,
    );
    if (indexArtist < 0) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    this.artists.splice(indexArtist, 1);

    const indexInFavourites = this.favorites.artists.findIndex(
      (favouriteArtistId) => favouriteArtistId === artistId,
    );
    if (indexInFavourites >= 0) {
      this.favorites.artists.splice(indexInFavourites, 1);
    }

    this.tracks.forEach((track: Track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });

    this.albums.forEach((album: Album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }

  public async addArtistToFavorites(artistId: string): Promise<boolean> {
    this.favorites.artists.push(artistId);
    return true;
  }

  public async deleteArtistFromFavorites(artistId: string): Promise<boolean> {
    const indexInFavourites = this.favorites.artists.findIndex(
      (favouriteArtistId) => favouriteArtistId === artistId,
    );
    if (indexInFavourites < 0) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND_IN_FAVORITES);
    }
    this.favorites.artists.splice(indexInFavourites, 1);
    return true;
  }

  public async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  public async getAlbum(albumId: string): Promise<Album | undefined> {
    return this.albums.find((album: Album) => album.id == albumId);
  }

  public async createAlbum(newAlbum: Album): Promise<Album> {
    this.albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(
    albumId: string,
    updateDto: UpdateAlbumDto,
  ): Promise<Album> {
    const albumIndex = this.albums.findIndex(
      (album: Album) => album.id === albumId,
    );
    const newAlbum = { ...this.albums[albumIndex], ...updateDto };
    this.albums[albumIndex] = newAlbum;
    return newAlbum;
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    const albumIndex = this.albums.findIndex(
      (album: Album) => album.id === albumId,
    );
    if (albumIndex < 0) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    this.albums.splice(albumIndex, 1);

    const indexInFavourites = this.favorites.albums.findIndex(
      (favoriteAlbumId) => favoriteAlbumId === albumId,
    );
    if (indexInFavourites >= 0) {
      this.favorites.albums.splice(indexInFavourites, 1);
    }

    this.tracks.forEach((track: Track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  public async addAlbumToFavorites(albumId: string): Promise<boolean> {
    this.favorites.albums.push(albumId);
    return true;
  }

  public async deleteAlbumFromFavorites(albumId: string): Promise<boolean> {
    const indexInFavorites = this.favorites.albums.findIndex(
      (favoriteAlbumId) => favoriteAlbumId === albumId,
    );
    if (indexInFavorites < 0) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND_IN_FAVORITES);
    }
    this.favorites.albums.splice(indexInFavorites, 1);
    return true;
  }

  public async getFavorites(): Promise<Favorites> {
    return this.favorites;
  }
}
