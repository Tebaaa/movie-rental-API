import { Test, TestingModule } from '@nestjs/testing';
import { MovieEntity } from '../entities/movie.entity';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import { RentalServices } from '../rental-services.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  const mockMovieId = 3;
  const mockUpdateMovieDto = {
    title: 'new title',
  };
  const mockCreateMovieDto = {
    title: 'title',
    available: true,
    description: 'description',
    likes: 3,
    poster: 'poster',
    rent_price: 10,
    sale_price: 20,
    stock: 2,
    tags: [],
    trailer_url: 'url',
  };
  const mockMovie: MovieEntity = {
    id: 1,
    ...mockCreateMovieDto,
  };
  const mockMoviesList: MovieEntity[] = [
    mockMovie,
    {
      ...mockMovie,
      id: 2,
    },
    {
      ...mockMovie,
      id: 3,
    },
  ];
  const mockMoviesService = {
    findAll: jest.fn(() => mockMoviesList),
    findById: jest.fn((id: number) => {
      return mockMoviesList.find((movie) => movie.id === id);
    }),
    create: jest.fn((dto) => {
      return {
        id: 4,
        ...dto,
      };
    }),
    update: jest.fn((id: number, dto) => {
      const movie = mockMoviesList.find((movie) => movie.id === id);
      return {
        ...movie,
        ...dto,
      };
    }),
    delete: jest.fn((id: number) => {
      return mockMoviesList.find((movie) => movie.id === id);
    }),
  };
  const mockRentalService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        { provide: MoviesService, useValue: mockMoviesService },
        { provide: RentalServices, useValue: mockRentalService },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a list of movies', () => {
    expect(controller.getAll()).toEqual(mockMoviesList);
  });

  it('should get a movie by its id', () => {
    const expectedMovie = mockMoviesList.find(
      (movie) => movie.id === mockMovieId,
    );
    expect(controller.getById(mockMovieId)).toEqual(expectedMovie);
  });

  it('should create a movie', () => {
    expect(controller.create(mockCreateMovieDto)).toEqual({
      id: expect.any(Number),
      ...mockCreateMovieDto,
    });
  });

  it('should update a movie', () => {
    const findedMovie = mockMoviesList.find(
      (movie) => movie.id === mockMovieId,
    );
    const expectedMovie = {
      ...findedMovie,
      ...mockUpdateMovieDto,
    };

    expect(controller.update(mockUpdateMovieDto, mockMovieId)).toEqual(
      expectedMovie,
    );
  });

  it('should delete a movie', () => {
    const expectedMovie = mockMoviesList.find(
      (movie) => movie.id === mockMovieId,
    );
    expect(controller.delete(mockMovieId)).toEqual(expectedMovie);
  });
});
