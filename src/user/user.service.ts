// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //Admin Panel

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {

    const user = await this.userRepository.findOne({ where: { id: Number(id) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateData);                                                 
    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: Number(id) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }
}
 