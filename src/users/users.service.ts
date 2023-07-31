import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DataService } from '../data/data.service';

import { User } from './dto/user.dto';
import { UserResponse } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { ERRORS } from '../constants/index';

@Injectable()
export class UsersService {
  constructor(private dataService: DataService) {}

  public async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.dataService.getAllUsers();
    return users.map((user: User) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  public async getUser(userId: string): Promise<UserResponse> {
    const user = await this.dataService.getUser(userId);
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
    try {
      const user = await this.dataService.createUser(newUser);
      const { password, ...rest } = user;
      return rest;
    } catch {
      throw new InternalServerErrorException(ERRORS.ERROR);
    }
  }

  public async updatePassword(
    userId: string,
    updateDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const user = await this.dataService.getUser(userId);
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    const updatedUser = await this.dataService.updateUser(userId, updateDto);
    const { password, ...rest } = updatedUser;
    return rest;
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.dataService.deleteUser(userId);
  }
}
