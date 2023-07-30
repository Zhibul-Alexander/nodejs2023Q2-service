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

  public async getTrack(userId: string): Promise<Track> {
    const track = tracks.find((track: Track) => track.id === userId);
    if (!track) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    return track;
  }

  public async createTrack(trackDto: CreateTrackDto): Promise<Track> {
    const newTrack = {
      ...trackDto,
      id: uuidv4(),
      artistId: null,
      albumId: null,
    };
    tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(
    userId: string,
    updateDto: UpdateTrackDto,
  ): Promise<Track> {
    const trackIndex = tracks.findIndex((track: Track) => track.id === userId);
    if (trackIndex < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    tracks[trackIndex] = { ...tracks[trackIndex], ...updateDto };
    return tracks[trackIndex];
  }

  public async deleteTrack(userId: string): Promise<void> {
    const trackIndex = tracks.findIndex((track: Track) => track.id === userId);
    if (trackIndex < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    tracks.splice(trackIndex, 1);
  }
}
