import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return true;
  }
  findById(id: number) {
    return id;
  }
  create(createUserDto) {
    return createUserDto;
  }
  update(id: number, updateUserDto) {
    return updateUserDto;
  }
  delete(id: number) {
    return id;
  }
}
