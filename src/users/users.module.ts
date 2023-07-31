import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { DataModule } from '../data/data.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DataModule],
})
export class UsersModule {}
