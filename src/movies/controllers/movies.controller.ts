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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@Auth/guards';
import { IdParamDto } from '@Core/dtos';

import { CreateMovieDto, QueryParamsDto, UpdateMovieDto } from '../dto/';
import { AdminGuard } from '../guards/';
import { MoviesService } from '../services/';

@ApiTags('Movies management endpoints')
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getAll(@Query() query: QueryParamsDto) {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  getById(@Param() id: IdParamDto) {
    return this.moviesService.findById(id.id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Body() updateMovieDto: UpdateMovieDto, @Param() id: IdParamDto) {
    return this.moviesService.update(id.id, updateMovieDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() id: IdParamDto) {
    return this.moviesService.delete(id.id);
  }
}
