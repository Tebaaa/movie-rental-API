import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
describe('MoviesController', () => {
  let controller: MoviesController;

  const mockMoviesService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: mockMoviesService }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a list of movies', async () => {
    const expectedMovies = [{}];
    const queryParamsDto = {};
    mockMoviesService.findAll.mockReturnValue(expectedMovies);
    const returnValue = await controller.getAll(queryParamsDto);
    expect(returnValue).toEqual(expectedMovies);
  });

  it('should get a movie by its id', async () => {
    const expectedMovie = {};
    mockMoviesService.findById.mockReturnValue(expectedMovie);
    const returnValue = await controller.getById(1);
    expect(returnValue).toEqual(expectedMovie);
  });

  it('should create a movie', async () => {
    const expectedReturn = {};
    const createMovieDto: CreateMovieDto = {
      available: true,
      description: '',
      likes: 2,
      name: '',
      poster: '',
      rent_price: 1,
      sale_price: 1,
      stock: 1,
      trailer_url: '',
      tags: [],
    };
    mockMoviesService.create.mockReturnValue(expectedReturn);
    const returnValue = await controller.create(createMovieDto);
    expect(returnValue).toEqual(expectedReturn);
  });

  it('should update a movie', async () => {
    const expectedReturn = {};
    const updateMovieDto = { rent_price: 1 };
    mockMoviesService.update.mockReturnValue(expectedReturn);
    const returnValue = await controller.update(updateMovieDto, 1);
    expect(returnValue).toEqual(expectedReturn);
  });

  it('should delete a movie', async () => {
    const expectedReturn = {};
    mockMoviesService.delete.mockReturnValue(expectedReturn);
    const returnValue = await controller.delete(1);
    expect(returnValue).toEqual(expectedReturn);
  });
});
