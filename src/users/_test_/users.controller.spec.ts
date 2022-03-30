import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/users.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUserId = 3;
  const mockUser: User = {
    id: 1,
    username: 'username',
    password: 'password',
    role: 'admin',
  };
  const mockUsersList: User[] = [
    { ...mockUser },
    {
      ...mockUser,
      id: 2,
    },
    {
      ...mockUser,
      id: 3,
    },
  ];
  const mockCreateUserDto: CreateUserDto = {
    username: 'new username',
    password: 'new pass',
    role: 'admin',
  };
  const mockUpdateUserDto: UpdateUserDto = { username: 'updated username' };
  const mockUserService = {
    findAll: jest.fn(() => ['test']),
    findById: jest.fn((id: number): User => {
      return mockUsersList.find((user) => user.id === id);
    }),
    create: jest.fn((dto): User => {
      return {
        id: 1,
        ...dto,
      };
    }),
    update: jest.fn((id: number, dto): User => {
      return {
        id,
        ...dto,
      };
    }),
    delete: jest.fn((id: number): User => {
      return mockUsersList.find((user) => user.id === id);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
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
      id: expect.any(Number),
      ...mockCreateUserDto,
    });
  });

  it('should update a user', () => {
    expect(controller.update(mockUserId, mockUpdateUserDto)).toEqual({
      id: mockUserId,
      ...mockUpdateUserDto,
    });
  });

  it('should get a list of users', () => {
    expect(controller.getAll()).toEqual(['test']);
  });

  it('should get an user by its id', () => {
    const expectedUser = mockUsersList.find((user) => user.id === mockUserId);
    expect(controller.getById(mockUserId)).toEqual(expectedUser);
  });

  it('should delete an user by its id', () => {
    const expectedUser = mockUsersList.find((user) => user.id === mockUserId);
    expect(controller.getById(mockUserId)).toEqual(expectedUser);
  });
});
