import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../create-mock-repository.class';
import { Connection } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { MoviesService } from '../services/movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;
  let moviesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of movies', async () => {
      const expectedList = [];
      moviesRepository.find.mockReturnValue(expectedList);
      const list = await service.findAll();
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
});
