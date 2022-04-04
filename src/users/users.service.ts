import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IdDto } from './dto/id.dto';
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
  async findById(idDto: IdDto) {
    const user = await this.userRepository.findOne(idDto.id);
    if (!user) throw new NotFoundException(`User #${idDto.id} not found`);
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const existingEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (existingEmail)
      throw new ConflictException('Email is already registered');
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
  async update(idDto: IdDto, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      ...updateUserDto,
      id: idDto.id,
    });
    if (!user) throw new NotFoundException(`User #${idDto.id} not found`);
    return this.userRepository.save(user);
  }
  async delete(idDto: IdDto) {
    const user = await this.findById(idDto);
    return this.userRepository.remove(user);
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) throw new NotFoundException(`There's no user with that email`);
    return user;
  }

  async changePassword(
    userFromRequest,
    idDto: IdDto,
    changePasswordDto: ChangePasswordDto,
  ) {
    const correctId = userFromRequest.id === idDto.id;
    const user = await this.findById(idDto);
    const { oldPassword, newPassword, newPasswordConfirmation } =
      changePasswordDto;
    const correctOldPassword = user.password === oldPassword;
    const equalNewPassword = newPassword === newPasswordConfirmation;
    const oldPasswordEqualNewPassword = newPassword === oldPassword;
    const updatePassword = { password: newPassword };
    switch (true) {
      case !correctId:
        throw new ConflictException(
          'You are authenticated with a different id',
        );
      case !correctOldPassword:
        throw new ConflictException('Incorrect old password');
      case !equalNewPassword:
        throw new ConflictException('Your new password must match');
      case oldPasswordEqualNewPassword:
        throw new ConflictException(
          'Your new password must be different from the old one',
        );
      default:
        return this.update(idDto, updatePassword);
    }
  }
}
