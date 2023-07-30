import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { artists } from '../store';

import { Artist } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { ERRORS } from '../constants/index';

@Injectable()
export class ArtistService {
  public async getAllArtists(): Promise<Artist[]> {
    return artists;
  }

  public async getArtist(artistId: string): Promise<Artist> {
    const artist = artists.find((artist: Artist) => artist.id === artistId);
    if (!artist) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    return artist;
  }

  public async createArtist(createDto: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      ...createDto,
      id: uuidv4(),
    };
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
    if (indexArtist < 0) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    artists[indexArtist] = { ...artists[indexArtist], ...updateDto };
    return artists[indexArtist];
  }

  public async deleteArtist(artistId: string): Promise<void> {
    const indexArtist = artists.findIndex(
      (artist: Artist) => artist.id === artistId,
    );
    if (indexArtist < 0) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    artists.splice(indexArtist, 1);
  }
}
