import { Injectable, NotFoundException } from '@nestjs/common';

import { tracks, favorites } from '../store';

import { Track } from '../track/dto/track.dto';

import { ERRORS } from '../constants';

@Injectable()
export class FavoritesTracksService {
  public async addToFavorites(trackId: string): Promise<void> {
    const track = tracks.find((track: Track) => track.id === trackId);
    if (!track) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    favorites.tracks.push(trackId);
  }

  public async deleteFromFavorites(trackId: string): Promise<void> {
    const trackIndex = tracks.findIndex((track: Track) => track.id === trackId);
    if (trackIndex < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    const favoriteTrackIndex = favorites.tracks.findIndex(
      (favoriteTrackId) => favoriteTrackId === trackId,
    );
    if (favoriteTrackIndex < 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND_IN_FAVORITES);
    }
    favorites.tracks.splice(trackIndex, 1);
  }
}
