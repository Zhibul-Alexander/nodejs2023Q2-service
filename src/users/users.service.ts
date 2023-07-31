import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DataService } from '../data/data.service';

import { User } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { ERRORS } from '../constants/index';

@Injectable()
export class UsersService {
  constructor(private dataService: DataService) {}

  public async getAllUsers(): Promise<User[]> {
    const users = await this.dataService.getAllUsers();
    return users.map((user: User) => {
      return new User(user);
    });
  }

  public async getUser(userId: string): Promise<User> {
    const user = await this.dataService.getUser(userId);
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    return new User(user);
  }

  public async createUser(createDto: CreateUserDto): Promise<User> {
    const newUser: User = {
      ...createDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      const user = await this.dataService.createUser(newUser);
      return new User(user);
    } catch {
      throw new InternalServerErrorException(ERRORS.USER_CREATED_ERROR);
    }
  }

  public async updatePassword(
    userId: string,
    updateDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.dataService.getUser(userId);
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    const updatedUser = await this.dataService.updateUser(userId, updateDto);
    return new User(updatedUser);
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.dataService.deleteUser(userId);
  }
}
