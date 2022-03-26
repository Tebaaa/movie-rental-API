import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  findAll() {
    return this.userRepository.find();
  }
  async findById(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const existingUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });
    if (existingUsername)
      throw new ConflictException('Username has already been taken ');
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return this.userRepository.save(user);
  }
  async delete(id: number) {
    const user = await this.findById(id);
    return this.userRepository.remove(user);
  }
}
