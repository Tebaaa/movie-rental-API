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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@Auth/guards';
import { RentalActionDto } from '@Movies/dto';
import { AdminGuard, ClientGuard } from '@Movies/guards';
import { IdParamDto } from '@Core/dtos';

import { CreateUserDto, UpdateUserDto } from '../dto/';
import { CorrectIdGuard } from '../guards/';
import { UsersService } from '../services/';

@ApiTags('Users management endpoints')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param() idDto: IdParamDto) {
    return this.usersService.findById(idDto.id);
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
    return this.usersService.update(idDto.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() idDto: IdParamDto) {
    return this.usersService.delete(idDto.id);
  }

  @UseGuards(JwtAuthGuard, CorrectIdGuard, ClientGuard)
  @Get(':id/movies')
  async getRecord(@Param() idDto: IdParamDto) {
    //TODO: check response... Remember that is always an array []
    return await this.eventEmitter.emitAsync('movieRental.getRecord', idDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, CorrectIdGuard, ClientGuard)
  @Post(':id/movies')
  async rentalService(
    @Param() idDto: IdParamDto,
    @Body() rentalActionDto: RentalActionDto,
  ) {
    //TODO: create method in users service and emit an event
    return await this.eventEmitter.emitAsync(
      'movieRental.executeAction',
      idDto,
      rentalActionDto,
    );
  }
}
