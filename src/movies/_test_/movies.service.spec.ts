import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../create-mock-repository.class';
import { Connection } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { MoviesService } from '../services/movies.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { TagEntity } from '../entities/tags.entity';

describe('MoviesService', () => {
  let service: MoviesService;
  let moviesRepository: MockRepository;
  let tagsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(TagEntity),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
    tagsRepository = module.get<MockRepository>(getRepositoryToken(TagEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of movies', async () => {
      const expectedList = [];
      moviesRepository.find.mockReturnValue(expectedList);
      const list = await service.findAll({});
      expect(list).toEqual(expectedList);
    });
  });

  describe('findById', () => {
    const movieId = 1;
    describe('when movie with ID exists', () => {
      it('should return a movie object', async () => {
        const expectedMovie = {};
        moviesRepository.findOne.mockReturnValue(expectedMovie);
        const movie = await service.findById(movieId);
        expect(movie).toEqual(expectedMovie);
      });
    });
    describe('otherwise', () => {
      it('should throw a NotFoundException', async () => {
        moviesRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findById(movieId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Movie #${movieId} not found`);
        }
      });
    });
  });

  describe('create', () => {
    const createMovieDto: CreateMovieDto = {
      available: true,
      description: '',
      likes: 1,
      poster: '',
      rent_price: 10,
      sale_price: 20,
      stock: 2,
      name: '',
      trailer_url: '',
      tags: [],
    };
    const expectedCreatedMovie = {};
    describe(`if movie doesn't already exists`, () => {
      it('should return a created movie object', async () => {
        moviesRepository.save.mockReturnValue(expectedCreatedMovie);
        const createdMovie = await service.create(createMovieDto);
        expect(createdMovie).toEqual(expectedCreatedMovie);
      });
    });
    describe('otherwise', () => {
      it('should throw a ConflictException', async () => {
        moviesRepository.findOne.mockReturnValue(expectedCreatedMovie);
        try {
          await service.create(createMovieDto);
        } catch (err) {
          expect(err).toBeInstanceOf(ConflictException);
          expect(err.message).toEqual('Movie already exists');
        }
      });
    });
  });

  describe('update', () => {
    const movieId = 1;
    const updateMovieDto = { name: 'new title' };
    describe('when movie with ID exists', () => {
      it('should return an updated movie object', async () => {
        const expectedMovie = {};
        moviesRepository.preload.mockReturnValue(expectedMovie);
        moviesRepository.save.mockReturnValue(expectedMovie);
        const movie = await service.update(movieId, updateMovieDto);
        expect(movie).toEqual(expectedMovie);
      });
    });
    describe('otherwise', () => {
      it('should throw a NotFoundException', async () => {
        moviesRepository.preload.mockReturnValue(undefined);
        try {
          await service.update(movieId, updateMovieDto);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Movie #${movieId} not found`);
        }
      });
    });
  });

  describe('delete', () => {
    const movieId = 1;
    describe('when a movie with Id exists', () => {
      it('should return a deleted movie object', async () => {
        const expectedMovie = {};
        moviesRepository.findOne.mockReturnValue(expectedMovie);
        moviesRepository.remove.mockReturnValue(expectedMovie);
        const movie = await service.delete(movieId);
        expect(movie).toEqual(expectedMovie);
      });
    });
    describe('otherwise', () => {
      it('should throw a NotFoundException', async () => {
        moviesRepository.findOne.mockReturnValue(undefined);
        try {
          await service.delete(movieId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Movie #${movieId} not found`);
        }
      });
    });
  });
  describe('sortBy', () => {
    describe(`when sorter is 'name'`, () => {
      it('should return object with name property', async () => {
        const expectedObject = { order: { name: 'ASC' } };
        const returnedObject = service.sortBy('name', {});
        expect(expectedObject).toEqual(returnedObject);
      });
    });
    describe(`when sorter is 'likes'`, () => {
      it('should return object with likes property', async () => {
        const expectedObject = { order: { likes: 'DESC' } };
        const returnedObject = service.sortBy('likes', {});
        expect(expectedObject).toEqual(returnedObject);
      });
    });
    describe('otherwise', () => {
      it('should throw a BadRequestException', () => {
        try {
          service.sortBy('bla', {});
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          expect(err.message).toContain('sort value');
        }
      });
    });
  });
  describe('preloadTagByName', () => {
    describe('when tag with name exists', () => {
      it('should return a TagEntity object', async () => {
        const expectedTag = {};
        tagsRepository.findOne.mockReturnValue(expectedTag);
        const returnedTag = await service.preloadTagByName('');
        expect(returnedTag).toEqual(expectedTag);
      });
    });
    describe('otherwise', () => {
      it('should throw a NotFoundException', async () => {
        tagsRepository.findOne.mockReturnValue(undefined);
        try {
          await service.preloadTagByName('tag name');
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toContain(`doesn't exist`);
        }
      });
    });
  });
});
