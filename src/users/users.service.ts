import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { users } from '../store/index';

import { User } from './dto/user.dto';
import { UserResponse } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { ERRORS } from '../constants/index';

@Injectable()
export class UsersService {
  public async getAllUsers(): Promise<UserResponse[]> {
    return users.map((user: User) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  public async getUser(userId: string): Promise<UserResponse> {
    const user = users.find((user: User) => user.id === userId);
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    const { password, ...rest } = user;
    return rest;
  }

  public async createUser(createDto: CreateUserDto): Promise<UserResponse> {
    const newUser: User = {
      ...createDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(newUser);
    const { password, ...rest } = newUser;
    return rest;
  }

  public async updatePassword(
    userId: string,
    updateDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const userIndex = users.findIndex((user: User) => user.id === userId);
    if (userIndex < 0) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    const user = users[userIndex];

    if (user.password !== updateDto.oldPassword) {
      throw new HttpException(
        ERRORS.OLD_PASSWORD_INCORRECT,
        HttpStatus.FORBIDDEN,
      );
    }
    users[userIndex] = {
      ...user,
      password: updateDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    const { password, ...rest } = users[userIndex];
    return rest;
  }

  public async deleteUser(userId: string): Promise<void> {
    const userIndex = users.findIndex((user: User) => user.id === userId);
    if (userIndex < 0) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    users.splice(userIndex, 1);
  }
}
