import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard';
import { AdminGuard } from '../movies/guards/admin.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { IdDto } from './dto/id.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param() idDto: IdDto) {
    return this.usersService.findById(idDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param() idDto: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(idDto, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() idDto: IdDto) {
    return this.usersService.delete(idDto);
  }
}
