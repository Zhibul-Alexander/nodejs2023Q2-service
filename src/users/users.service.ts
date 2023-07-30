import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { users } from '../store/index';

import { User } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { ERRORS } from '../constants/index';

@Injectable()
export class UsersService {
  public async getAllUsers(): Promise<User[]> {
    return users;
  }

  public async getUser(userId: string): Promise<User> {
    const user = users.find((user: User) => user.id === userId);
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    return user;
  }

  public async createUser(userDto: CreateUserDto): Promise<User> {
    const newUser = {
      ...userDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(newUser);
    return newUser;
  }

  public async updatePassword(
    userId: string,
    passwordDto: UpdatePasswordDto,
  ): Promise<User> {
    const userIndex = users.findIndex((user: User) => user.id === userId);
    if (userIndex < 0) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    const user = users[userIndex];

    if (user.password !== passwordDto.oldPassword) {
      throw new HttpException(
        ERRORS.OLD_PASSWORD_INCORRECT,
        HttpStatus.FORBIDDEN,
      );
    }
    users[userIndex] = {
      ...user,
      password: passwordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    return users[userIndex];
  }

  public async deleteUser(userId: string): Promise<void> {
    const userIndex = users.findIndex((user: User) => user.id === userId);
    if (userIndex < 0) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    users.splice(userIndex, 1);
  }
}
