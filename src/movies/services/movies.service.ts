import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieEntity } from '../entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}
  findAll() {
    return this.movieRepository.find({ order: { title: 'ASC' } });
  }
  async findById(id: number) {
    const movie = await this.movieRepository.findOne(id);
    if (!movie) throw new NotFoundException(`Movie #${id} not found`);
    return movie;
  }
  async create(createMovieDto: CreateMovieDto) {
    const existingMovie = await this.movieRepository.findOne({
      title: createMovieDto.title,
      description: createMovieDto.description,
    });
    if (existingMovie) throw new ConflictException('Movie already exists');
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }
  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.preload({ id, ...updateMovieDto });
    if (!movie) throw new NotFoundException(`Movie #${id} not found`);
    return this.movieRepository.save(movie);
  }
  async delete(id: number) {
    const movie = await this.findById(id);
    return this.movieRepository.remove(movie);
  }
}
