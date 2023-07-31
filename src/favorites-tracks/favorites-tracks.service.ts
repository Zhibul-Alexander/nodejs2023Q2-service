import { Injectable } from '@nestjs/common';

import { DataService } from '../data/data.service';

@Injectable()
export class FavoritesTracksService {
  constructor(private dataService: DataService) {}

  public async addToFavorites(trackId: string): Promise<boolean> {
    const track = await this.dataService.getTrack(trackId);
    if (!track) {
      return false;
    }
    return this.dataService.addTrackToFavorites(trackId);
  }

  public async deleteFromFavorites(
    trackId: string,
  ): Promise<boolean | undefined> {
    const track = await this.dataService.getTrack(trackId);
    if (!track) {
      return;
    }
    await this.dataService.deleteTrackFromFavorites(trackId);
    return true;
  }
}
