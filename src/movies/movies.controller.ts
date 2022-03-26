import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.moviesService.findById(id);
  }

  @Post()
  create(@Body() createMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  update(@Body() updateMovieDto, @Param('id') id: number) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete('id')
  delete(@Param('id') id: number) {
    return this.moviesService.delete(id);
  }
}
