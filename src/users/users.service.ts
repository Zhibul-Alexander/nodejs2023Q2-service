import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import User from './users.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import {
  InternalError,
  NotFoundError,
  IncorrectPasswordError,
} from '../errors/index';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async getUser(userId: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User', userId);
    }
    return user;
  }

  public async createUser(createDto: CreateUserDto): Promise<User> {
    const newUser = { ...createDto, version: 1 };
    try {
      const user = await this.userRepository.create(newUser);
      await this.userRepository.save(user);
      return new User(user);
    } catch {
      throw new InternalError();
    }
  }

  public async updatePassword(
    userId: string,
    updateDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User', userId);
    }
    if (user.password === updateDto.oldPassword) {
      await this.userRepository.update(
        { id: userId },
        { password: updateDto.newPassword },
      );
      const updatedUser = await this.userRepository.findOne({
        where: { id: userId },
      });
      return new User(updatedUser);
    }
    throw new IncorrectPasswordError();
  }

  public async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User', userId);
    }
    await this.userRepository.delete(user);
  }
}
