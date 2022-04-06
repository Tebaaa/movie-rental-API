import { Test, TestingModule } from '@nestjs/testing';
import { RentalActionDto } from '../../movie-rental/dto/rental-action.dto';
import { MovieRentalService } from '../../movie-rental/movie-rental.service';
import {
  mockIdDto,
  mockUserService,
  mockUsersList,
} from '../../_test_mocks_/user-service.mock';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockCreateUserDto: CreateUserDto = {
    email: 'newEmail@mail.com',
    password: 'new pass',
    admin: true,
    client: true,
    name: 'new user name',
  };
  const mockUpdateUserDto: UpdateUserDto = { name: 'updated name' };

  const mockMovieRentalService = {
    getRecord: jest.fn(),
    executeAction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: MovieRentalService, useValue: mockMovieRentalService },
      ],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(controller.create(mockCreateUserDto)).toEqual({
      id: expect.any(String),
      ...mockCreateUserDto,
    });
  });

  it('should update a user', () => {
    expect(controller.update(mockIdDto, mockUpdateUserDto)).toEqual({
      id: mockIdDto,
      ...mockUpdateUserDto,
    });
  });

  it('should get a list of users', () => {
    expect(controller.getAll()).toEqual(['test']);
  });

  it('should get an user by its id', () => {
    const expectedUser = mockUsersList.find((user) => user.id === mockIdDto.id);
    expect(controller.getById(mockIdDto)).toEqual(expectedUser);
  });

  it('should delete an user by its id', () => {
    const expectedUser = mockUsersList.find((user) => user.id === mockIdDto.id);
    expect(controller.delete(mockIdDto)).toEqual(expectedUser);
  });
  it(`should get user's record`, async () => {
    const expectedRecord = {};
    mockMovieRentalService.getRecord.mockReturnValue(expectedRecord);
    const returnValue = await controller.getRecord(mockIdDto);
    expect(returnValue).toEqual(expectedRecord);
  });
  it('should buy/rent/return a movie', async () => {
    const expectedReturn = {};
    mockMovieRentalService.executeAction.mockReturnValue(expectedReturn);
    const returnValue = await controller.rentalService(
      mockIdDto,
      {} as RentalActionDto,
    );
    expect(returnValue).toEqual(expectedReturn);
  });
});
