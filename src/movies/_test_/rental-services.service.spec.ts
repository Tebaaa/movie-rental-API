import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../create-mock-repository.class';
import { MovieEntity } from '../entities/movie.entity';
import { RentalServices } from '../services/rental-services.service';
import { MoviesService } from '../services/movies.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('RentalServices', () => {
  let service: RentalServices;
  let moviesRepository: MockRepository;
  const mockMovieService = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalServices,
        MoviesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: createMockRepository(),
        },
      ],
    })
      .overrideProvider(MoviesService)
      .useValue(mockMovieService)
      .compile();

    service = module.get<RentalServices>(RentalServices);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buy', () => {
    const movieId = 1;
    describe('when stock is not 0 and is available', () => {
      it('should return an updated movie', async () => {
        const expectedMovie = { stock: 2, available: true };
        mockMovieService.findById.mockReturnValue(expectedMovie);
        mockMovieService.update.mockReturnValue(expectedMovie);
        const movie = await service.buy(movieId);
        expect(movie).toEqual(expectedMovie);
      });
    });
    describe('otherwise', () => {
      it('should throw a ConflictException', async () => {
        const returnedMovie = { stock: 0, available: false };
        mockMovieService.findById.mockReturnValue(returnedMovie);
        try {
          await service.buy(movieId);
        } catch (err) {
          expect(err).toBeInstanceOf(ConflictException);
          expect(err.message).toEqual('No stock available');
        }
      });
    });
  });
});
