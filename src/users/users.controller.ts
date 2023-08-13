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
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import User from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { NotFoundError, IncorrectPasswordError } from '../errors/index';

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
    try {
      return await this.usersService.getUser(userId);
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw new InternalServerErrorException(ERRORS.ERROR);
    }
  }

  @Post()
  async createUser(@Body() createDto: CreateUserDto): Promise<User> {
    try {
      return this.usersService.createUser(createDto);
    } catch {
      throw new InternalServerErrorException(ERRORS.ERROR);
    }
  }

  @Put(':userId')
  async updatePassword(
    @Body() updateDto: UpdatePasswordDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<User> {
    try {
      return await this.usersService.updatePassword(userId, updateDto);
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundException(e.message);
      }
      if (e instanceof IncorrectPasswordError) {
        throw new HttpException(e.message, HttpStatus.FORBIDDEN);
      }
      throw new InternalServerErrorException(ERRORS.ERROR);
    }
  }

  @Delete(':userId')
  @HttpCode(204)
  async deleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    try {
      await this.usersService.deleteUser(userId);
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw new InternalServerErrorException(ERRORS.ERROR);
    }
  }
}
