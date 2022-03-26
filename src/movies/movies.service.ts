import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  findAll() {
    return true;
  }
  findById(id: number) {
    return id;
  }
  create(createMovieDto) {
    return createMovieDto;
  }
  update(id: number, updateMovieDto) {
    return updateMovieDto;
  }
  delete(id: number) {
    return id;
  }
}
