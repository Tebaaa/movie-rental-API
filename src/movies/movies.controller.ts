import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AdminGuard } from './guards/admin.guard';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getAll(@Query() query: QueryParamsDto) {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.moviesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Body() updateMovieDto: UpdateMovieDto, @Param('id') id: number) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.moviesService.delete(id);
  }
}
