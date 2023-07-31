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
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { User } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { ERRORS } from '../constants/index';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  async getUser(@Param('userId', ParseUUIDPipe) userId: string): Promise<User> {
    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    return user;
  }

  @Post()
  async createUser(@Body() createDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.createUser(createDto);
    if (!user) {
      throw new InternalServerErrorException(ERRORS.ERROR);
    }
    return user;
  }

  @Put(':userId')
  async updatePassword(
    @Body() updateDto: UpdatePasswordDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<User> {
    const updatedUser = await this.usersService.updatePassword(
      userId,
      updateDto,
    );
    if (!updatedUser) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    return updatedUser;
  }

  @Delete(':userId')
  @HttpCode(204)
  async deleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return this.usersService.deleteUser(userId);
  }
}
