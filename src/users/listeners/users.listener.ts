import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UsersService } from '../services';
import { User } from '../entities';
import { UpdateUserDto } from '../dto';

@Injectable()
export class UsersListener implements Partial<UsersService> {
  constructor(private usersService: UsersService) {}

  @OnEvent('users.getOneById')
  async findById(id: string): Promise<User> {
    if (!id) throw new Error('No id provided');

    return await this.usersService.findById(id);
  }

  @OnEvent('users.getOneByEmail')
  async findByEmail(email: string): Promise<User> {
    if (!email) throw new Error('No email provided');

    return await this.usersService.findByEmail(email);
  }

  @OnEvent('users.updateOne')
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!id) throw new Error('No id provided');
    if (!updateUserDto) throw new Error('No update DTO provided');

    return await this.usersService.update(id, updateUserDto);
  }
}
