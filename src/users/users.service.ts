import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  public async getUser(userId: string): Promise<User | undefined> {
    const user = await this.dataService.getUser(userId);
    if (!user) {
      return;
    }
    return new User(user);
  }

  public async createUser(createDto: CreateUserDto): Promise<User | undefined> {
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
      return;
    }
  }

  public async updatePassword(
    userId: string,
    updateDto: UpdatePasswordDto,
  ): Promise<User | undefined> {
    const user = await this.dataService.getUser(userId);
    if (!user) {
      return;
    }
    if (user.password === updateDto.oldPassword) {
      const updatedUser = await this.dataService.updateUser(userId, updateDto);
      return new User(updatedUser);
    }
    throw new HttpException(
      ERRORS.OLD_PASSWORD_INCORRECT,
      HttpStatus.FORBIDDEN,
    );
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.dataService.deleteUser(userId);
  }
}
