import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DataService } from '../data/data.service';

import { Artist } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private dataService: DataService) {}

  public async getAllArtists(): Promise<Artist[]> {
    return this.dataService.getAllArtists();
  }

  public async getArtist(artistId: string): Promise<Artist> {
    const artist = await this.dataService.getArtist(artistId);
    if (!artist) {
      return;
    }
    return artist;
  }

  public async createArtist(createDto: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      id: uuidv4(),
      ...createDto,
    };
    return this.dataService.createArtist(newArtist);
  }

  public async updateArtist(
    artistId: string,
    updateDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.dataService.getArtist(artistId);
    if (!artist) {
      return;
    }
    return this.dataService.updateArtist(artistId, updateDto);
  }

  public async deleteArtist(artistId: string): Promise<void> {
    await this.dataService.deleteArtist(artistId);
  }
}
