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

import { JwtAuthGuard } from '@Auth/guards';
import { MovieRentalService } from '@Movies/services';
import { RentalActionDto } from '@Movies/dto';
import { AdminGuard, ClientGuard } from '@Movies/guards';
import { IdParamDto } from '@Core/dtos';

import { CreateUserDto, UpdateUserDto } from '../dto/';
import { CorrectIdGuard } from '../guards/';
import { UsersService } from '../services/';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private movieRentalService: MovieRentalService,
  ) {}
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param() idDto: IdParamDto) {
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
  update(@Param() idDto: IdParamDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(idDto, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() idDto: IdParamDto) {
    return this.usersService.delete(idDto);
  }

  @UseGuards(JwtAuthGuard, CorrectIdGuard, ClientGuard)
  @Get(':id/movies')
  async getRecord(@Param() idDto: IdParamDto) {
    return this.movieRentalService.getRecord(idDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, CorrectIdGuard, ClientGuard)
  @Post(':id/movies')
  async rentalService(
    @Param() idDto: IdParamDto,
    @Body() rentalActionDto: RentalActionDto,
  ) {
    return this.movieRentalService.executeAction(idDto, rentalActionDto);
  }
}
