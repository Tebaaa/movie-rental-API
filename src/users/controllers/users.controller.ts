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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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

  @ApiOperation({
    description: 'Use this endpoint to get all users',
    summary: 'Get all users',
  })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    description: 'Use this endpoint to get one user by its Id',
    summary: 'Get one user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param() { id }: IdParamDto) {
    return this.usersService.findById(id);
  }

  @ApiOperation({
    summary: 'Create user',
    description: 'Use this endpoint to create an user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    description: 'Use this endpoint to update an user by its Id',
    summary: 'Update user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param() idDto: IdParamDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(idDto.id, updateUserDto);
  }

  @ApiOperation({
    description: 'Use this endpoint to delete an user by its Id',
    summary: 'Delete user',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() idDto: IdParamDto) {
    return this.usersService.delete(idDto.id);
  }

  @ApiOperation({
    description:
      'Use this endpoint to get all movies that belongs to an user by its Id',
    summary: `Get user's movies`,
  })
  @UseGuards(JwtAuthGuard, CorrectIdGuard, ClientGuard)
  @Get(':id/movies')
  async getRecord(@Param() idDto: IdParamDto) {
    //TODO: check response... Remember that is always an array []
    return await this.eventEmitter.emitAsync('movieRental.getRecord', idDto);
  }

  @ApiOperation({
    summary: 'Do an action to movies',
    description: `Use this endpoint to rent, buy or return movies`,
  })
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
