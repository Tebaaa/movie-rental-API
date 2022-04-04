import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { TagEntity } from './entities/tags.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}
  findAll(queryParams: QueryParamsDto) {
    const { available, tag, name, sortBy } = queryParams;
    const sortByName = sortBy === 'name';
    const sortByLikes = sortBy === 'likes';
    const listOfTags = typeof tag === 'object';
    const singleTag = typeof tag === 'string';
    const availableFilter = available === 'true';
    const nameFilter = name;
    if (nameFilter) {
      return this.movieRepository.find({
        relations: ['tags'],
        where: { name: Like(`%${nameFilter}%`) },
      });
    }
    return this.movieRepository.find({
      order: { name: 'ASC' },
      relations: ['tags'],
      where: { available: true },
    });
  }
  async findById(id: number) {
    const movie = await this.movieRepository.findOne(id, {
      relations: ['tags'],
    });
    if (!movie) throw new NotFoundException(`Movie #${id} not found`);
    return movie;
  }
  async create(createMovieDto: CreateMovieDto) {
    const existingMovie = await this.movieRepository.findOne({
      name: createMovieDto.name,
      description: createMovieDto.description,
    });
    if (existingMovie) {
      throw new ConflictException('Movie already exists');
    }
    const tags = await Promise.all(
      createMovieDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const movie = this.movieRepository.create({ ...createMovieDto, tags });
    return this.movieRepository.save(movie);
  }
  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const tags =
      updateMovieDto.tags &&
      (await Promise.all(
        updateMovieDto.tags.map((name) => this.preloadTagByName(name)),
      ));
    const movie = await this.movieRepository.preload({
      id,
      ...updateMovieDto,
      tags,
    });
    if (!movie) throw new NotFoundException(`Movie #${id} not found`);
    return this.movieRepository.save(movie);
  }
  async delete(id: number) {
    const movie = await this.findById(id);
    return this.movieRepository.remove(movie);
  }

  private async preloadTagByName(name: string) {
    const existingTag = await this.tagRepository.findOne({ name });
    if (existingTag) {
      return existingTag;
    }
    throw new NotFoundException(`Tag '${name}' doesn't exist`);
  }
}
