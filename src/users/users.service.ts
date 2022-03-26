import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  findAll() {
    return true;
  }
  findById(id: number) {
    return id;
  }
  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }
  delete(id: number) {
    return id;
  }
}
