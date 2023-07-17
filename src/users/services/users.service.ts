import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IdParamDto } from '@Core/dtos';

import { CreateUserDto, UpdateUserDto } from '../dto/';
import { UsersRepository } from '../repositories';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  findAll() {
    return this.userRepository.find();
  }
  async findById(idDto: IdParamDto) {
    const user = await this.userRepository.findOneUserById(idDto.id);
    if (!user) throw new NotFoundException(`User #${idDto.id} not found`);
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const existingEmail = await this.userRepository.findOneUserByEmail(
      createUserDto.email,
    );
    if (existingEmail)
      throw new ConflictException('Email is already registered');
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
  async update(idDto: IdParamDto, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      ...updateUserDto,
      id: idDto.id,
    });
    if (!user) throw new NotFoundException(`User #${idDto.id} not found`);
    return this.userRepository.save(user);
  }
  async delete(idDto: IdParamDto) {
    const user = await this.findById(idDto);
    return this.userRepository.remove(user);
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOneUserByEmail(email);
    if (!user) throw new NotFoundException(`There's no user with that email`);
    return user;
  }
}
