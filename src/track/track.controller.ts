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
} from '@nestjs/common';

import { TrackService } from './track.service';

import { Track } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

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
    return this.trackService.getTrack(trackId);
  }

  @Post()
  async createTrack(@Body() createDto: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrack(createDto);
  }

  @Put(':trackId')
  async updateTrack(
    @Body() updateDto: UpdateTrackDto,
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ): Promise<Track> {
    return this.trackService.updateTrack(trackId, updateDto);
  }

  @Delete(':trackId')
  @HttpCode(204)
  async deleteTrack(
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ): Promise<void> {
    return this.trackService.deleteTrack(trackId);
  }
}
