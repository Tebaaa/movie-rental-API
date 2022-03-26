import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  findAll() {
    return true;
  }
  findById(id: number) {
    return id;
  }
  create(createMovieDto: CreateMovieDto) {
    return createMovieDto;
  }
  update(id: number, updateMovieDto: UpdateMovieDto) {
    return updateMovieDto;
  }
  delete(id: number) {
    return id;
  }
}
