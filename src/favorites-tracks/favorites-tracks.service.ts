import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { DataService } from '../data/data.service';

import { ERRORS } from '../constants';

@Injectable()
export class FavoritesTracksService {
  constructor(private dataService: DataService) {}

  public async addToFavorites(trackId: string): Promise<void> {
    const track = await this.dataService.getTrack(trackId);
    if (!track) {
      throw new UnprocessableEntityException(ERRORS.TRACK_NOT_FOUND);
    }
    await this.dataService.addTrackToFavorites(trackId);
  }

  public async deleteFromFavorites(trackId: string): Promise<void> {
    const track = await this.dataService.getTrack(trackId);
    if (!track) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    await this.dataService.deleteTrackFromFavorites(trackId);
  }
}
