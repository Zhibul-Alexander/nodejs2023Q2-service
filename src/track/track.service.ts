import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { tracks } from '../store/index';

import { Track } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { ERRORS } from '../constants/index';

@Injectable()
export class TrackService {
  public async getAllTracks(): Promise<Track[]> {
    return tracks;
  }

  public async getTrack(trackId: string): Promise<Track> {
    const track = tracks.find((track: Track) => track.id === trackId);
    if (!track) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    return track;
  }

  public async createTrack(createDto: CreateTrackDto): Promise<Track> {
    const newTrack = {
      ...createDto,
      id: uuidv4(),
      artistId: null,
      albumId: null,
    };
    tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(
    trackId: string,
    updateDto: UpdateTrackDto,
  ): Promise<Track> {
    const trackIndex = tracks.findIndex((track: Track) => track.id === trackId);
    if (trackIndex < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    tracks[trackIndex] = { ...tracks[trackIndex], ...updateDto };
    return tracks[trackIndex];
  }

  public async deleteTrack(trackId: string): Promise<void> {
    const trackIndex = tracks.findIndex((track: Track) => track.id === trackId);
    if (trackIndex < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    tracks.splice(trackIndex, 1);
  }
}
