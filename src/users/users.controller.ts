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
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard';
import { RentalActionDto } from '../movie-rental/dto/rental-action.dto';
import { MovieRentalService } from '../movie-rental/movie-rental.service';
import { AdminGuard } from '../movies/guards/admin.guard';
import { ClientGuard } from '../movies/guards/client.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IdDto } from './dto/id.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CorrectIdGuard } from './guards/correct-id.guard';
import { UsersService } from './users.service';

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

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, CorrectIdGuard)
  @Put(':id/password')
  changePassword(
    @Param() idDto: IdDto,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(idDto, changePasswordDto);
  }

  @UseGuards(JwtAuthGuard, CorrectIdGuard, ClientGuard)
  @Get(':id/movies')
  async getRecord(@Param() idDto: IdDto) {
    return this.movieRentalService.getRecord(idDto);
  }

  @UseGuards(JwtAuthGuard, CorrectIdGuard, ClientGuard)
  @Post(':id/movies')
  async rentalService(
    @Param() idDto: IdDto,
    @Body() rentalActionDto: RentalActionDto,
  ) {
    return this.movieRentalService.executeAction(idDto, rentalActionDto);
  }
}
