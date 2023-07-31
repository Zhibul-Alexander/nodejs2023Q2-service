import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { DataService } from '../data/data.service';

import { ERRORS } from '../constants';

@Injectable()
export class FavoritesAlbumsService {
  constructor(private dataService: DataService) {}

  public async addToFavorites(albumId: string): Promise<void> {
    const album = await this.dataService.getAlbum(albumId);

    if (!album) {
      throw new UnprocessableEntityException(ERRORS.ALBUM_NOT_FOUND);
    }
    await this.dataService.addAlbumToFavorites(albumId);
  }

  public async deleteFromFavorites(albumId: string): Promise<void> {
    const album = await this.dataService.getAlbum(albumId);
    if (!album) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    await this.dataService.deleteAlbumFromFavorites(albumId);
  }
}
