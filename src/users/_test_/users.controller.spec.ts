import { Test, TestingModule } from '@nestjs/testing';
import { MovieRentalService } from '../../movie-rental/movie-rental.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { IdDto } from '../dto/id.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/users.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockIdDto: IdDto = { id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2' };
  const mockUser: User = {
    id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2',
    email: 'email@example.com',
    password: 'password',
    name: 'name',
    admin: true,
    client: true,
    lastname: 'lastname',
    record: [],
  };
  const mockUsersList: User[] = [
    { ...mockUser },
    {
      ...mockUser,
      id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a3',
    },
    {
      ...mockUser,
      id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a4',
    },
  ];
  const mockCreateUserDto: CreateUserDto = {
    email: 'newEmail@mail.com',
    password: 'new pass',
    admin: true,
    client: true,
    name: 'new user name',
  };
  const mockUpdateUserDto: UpdateUserDto = { name: 'updated name' };
  const mockUserService = {
    findAll: jest.fn(() => ['test']),
    findById: jest.fn((idDto: IdDto): User => {
      return mockUsersList.find((user) => user.id === idDto.id);
    }),
    create: jest.fn((dto): User => {
      return {
        id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a8',
        ...dto,
      };
    }),
    update: jest.fn((id: number, dto): User => {
      return {
        id,
        ...dto,
      };
    }),
    delete: jest.fn((idDto: IdDto): User => {
      return mockUsersList.find((user) => user.id === idDto.id);
    }),
  };

  const mockMovieRentalService = {};

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
});
