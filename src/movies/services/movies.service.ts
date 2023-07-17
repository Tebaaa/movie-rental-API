import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOptions, Like } from 'typeorm';

import { CreateMovieDto, QueryParamsDto, UpdateMovieDto } from '../dto/';
import { MoviesRepository, TagsRepository } from '../repositories';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MoviesRepository,
    private readonly tagRepository: TagsRepository,
  ) {}
  async findAll(queryParams: QueryParamsDto) {
    const { available, tag, name, sortBy } = queryParams;
    const isNameFiltered = !!name;
    const isAvailableFiltered = typeof available === 'boolean';
    const isSorted = !!sortBy;
    const isTagFiltered = !!tag;
    let whereOptions = {};
    let findOptionsObject = {};
    if (isTagFiltered) {
      //TODO: implement tag filter
      console.log('falta implementar tag filter');
    }
    if (isNameFiltered) {
      whereOptions = {
        ...whereOptions,
        name: Like(`%${name}%`),
      };
    }
    if (isAvailableFiltered) {
      whereOptions = {
        ...whereOptions,
        available,
      };
    }
    if (isSorted) {
      findOptionsObject = this.sortBy(sortBy, findOptionsObject);
    }
    const whereOptionsNotEmpty = Object.keys(whereOptions).length !== 0;
    const findOptionsNotEmpty = Object.keys(findOptionsObject).length !== 0;
    switch (true) {
      case whereOptionsNotEmpty:
        findOptionsObject = {
          ...findOptionsObject,
          where: { ...whereOptions },
        };
      //TODO: make method in repository and use pagination :)
      case findOptionsNotEmpty:
        return await this.movieRepository.find(findOptionsObject);
      default:
        return await this.movieRepository.find({
          order: { name: 'ASC' },
          relations: ['tags'],
          where: { available: true },
        });
    }
  }
  async findById(id: string) {
    const movie = await this.movieRepository.findOneMovieById(id);
    if (!movie) throw new NotFoundException(`Movie #${id} not found`);
    return movie;
  }
  async create(createMovieDto: CreateMovieDto) {
    const { name, description } = createMovieDto;
    const existingMovie =
      await this.movieRepository.findOneMovieByNameAndDescription(
        name,
        description,
      );
    if (existingMovie) {
      throw new ConflictException('Movie already exists');
    }
    const tags = await Promise.all(
      createMovieDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const movie = this.movieRepository.create({ ...createMovieDto, tags });
    return this.movieRepository.save(movie);
  }
  async update(id: string, updateMovieDto: UpdateMovieDto) {
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
  async delete(id: string) {
    const movie = await this.findById(id);
    return this.movieRepository.remove(movie);
  }

  async preloadTagByName(name: string) {
    const existingTag = await this.tagRepository.findOneTagByName(name);
    if (existingTag) {
      return existingTag;
    }
    throw new NotFoundException(`Tag '${name}' doesn't exist`);
  }

  //TODO: check logic for sortBy method
  sortBy(sorter: string, findOptsObject: FindOptions) {
    const sortByName = sorter === 'name';
    const sortByLikes = sorter === 'likes';
    switch (true) {
      case sortByName:
        return {
          ...findOptsObject,
          order: { name: 'ASC' },
        };
      case sortByLikes:
        return {
          ...findOptsObject,
          order: { likes: 'DESC' },
        };
      default:
        throw new BadRequestException(`sort value must be 'name' or 'likes'`);
    }
  }
}
