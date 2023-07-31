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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { User } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  async getUser(@Param('userId', ParseUUIDPipe) userId: string): Promise<User> {
    return this.usersService.getUser(userId);
  }

  @Post()
  async createUser(@Body() createDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createDto);
  }

  @Put(':userId')
  async updatePassword(
    @Body() updateDto: UpdatePasswordDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<User> {
    return this.usersService.updatePassword(userId, updateDto);
  }

  @Delete(':userId')
  @HttpCode(204)
  async deleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return this.usersService.deleteUser(userId);
  }
}
