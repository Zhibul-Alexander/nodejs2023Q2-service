import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TrackService } from './track.service';

import { Track } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { ERRORS } from '../constants/index';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAllTracks(): Promise<Track[]> {
    return this.trackService.getAllTracks();
  }

  @Get(':trackId')
  async getTrack(
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ): Promise<Track> {
    const track = await this.trackService.getTrack(trackId);
    if (!track) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    return track;
  }

  @Post()
  async createTrack(@Body() createDto: CreateTrackDto): Promise<Track> {
    const track = await this.trackService.createTrack(createDto);
    if (!track) {
      throw new InternalServerErrorException(ERRORS.ERROR);
    }
    return track;
  }

  @Put(':trackId')
  async updateTrack(
    @Body() updateDto: UpdateTrackDto,
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ): Promise<Track> {
    const track = await this.trackService.updateTrack(trackId, updateDto);
    if (!track) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    return track;
  }

  @Delete(':trackId')
  @HttpCode(204)
  async deleteTrack(
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ): Promise<void> {
    return this.trackService.deleteTrack(trackId);
  }
}
