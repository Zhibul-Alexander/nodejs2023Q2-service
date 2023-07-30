import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
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

  @Get(':userId')
  async getTrack(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Track> {
    return this.trackService.getTrack(userId);
  }

  @Post()
  async createTrack(@Body() trackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrack(trackDto);
  }

  @Put(':userId')
  async updateTrack(
    @Body() updateDto: UpdateTrackDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Track> {
    return this.trackService.updateTrack(userId, updateDto);
  }

  @Delete(':userId')
  async deleteTrack(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return this.trackService.deleteTrack(userId);
  }
}
