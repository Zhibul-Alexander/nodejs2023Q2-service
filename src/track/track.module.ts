import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { TrackService } from './track.service';

import { DataModule } from '../data/data.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DataModule],
})
export class TrackModule {}
