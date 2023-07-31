import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DataService } from '../data/data.service';

import { Track } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private dataService: DataService) {}

  public async getAllTracks(): Promise<Track[]> {
    return this.dataService.getAllTracks();
  }

  public async getTrack(trackId: string): Promise<Track | undefined> {
    const track = await this.dataService.getTrack(trackId);
    if (!track) {
      return;
    }
    return track;
  }

  public async createTrack(
    createDto: CreateTrackDto,
  ): Promise<Track | undefined> {
    const newTrack = {
      ...createDto,
      id: uuidv4(),
      artistId: null,
      albumId: null,
    };
    try {
      return await this.dataService.createTrack(newTrack);
    } catch {
      return;
    }
  }

  public async updateTrack(
    trackId: string,
    updateDto: UpdateTrackDto,
  ): Promise<Track | undefined> {
    const track = await this.dataService.getTrack(trackId);
    if (!track) {
      return;
    }
    return this.dataService.updateTrack(trackId, updateDto);
  }

  public async deleteTrack(trackId: string): Promise<void> {
    await this.dataService.deleteTrack(trackId);
  }
}
