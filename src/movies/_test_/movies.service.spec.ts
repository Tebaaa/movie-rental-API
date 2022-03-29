import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../create-mock-repository.class';
import { Connection } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { MoviesService } from '../services/movies.service';

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
});
