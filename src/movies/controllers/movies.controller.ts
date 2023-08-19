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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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

  @ApiOperation({
    description: 'Use this endpoint to get all movies',
    summary: 'Get movies',
  })
  @Get()
  getAll(@Query() query: QueryParamsDto) {
    return this.moviesService.findAll(query);
  }

  @ApiOperation({
    description: 'Use this endpoint to get one movie by its id',
    summary: 'Get one movie',
  })
  @Get(':id')
  getById(@Param() { id }: IdParamDto) {
    return this.moviesService.findById(id);
  }

  @ApiOperation({
    description: `Use this endpoint to create a movie if you're admin`,
    summary: 'Create a movie',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOperation({
    description: `Use this endpoint to update a movie by its id if you're admin`,
    summary: 'Update a movie',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Body() updateMovieDto: UpdateMovieDto, @Param() id: IdParamDto) {
    return this.moviesService.update(id.id, updateMovieDto);
  }

  @ApiOperation({
    description: `Use this endpoint to delete a movie by its id if you're admin`,
    summary: 'Delete a movie',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() id: IdParamDto) {
    return this.moviesService.delete(id.id);
  }
}
