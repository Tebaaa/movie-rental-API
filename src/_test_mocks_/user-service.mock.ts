import { IdParamDto } from '@Core/dtos';
import { User } from '@Users/entities/';

export const mockIdDto: IdParamDto = {
  id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2',
};
export const mockUser: User = {
  id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2',
  email: 'email@example.com',
  password: 'password',
  name: 'name',
  admin: true,
  client: true,
  lastname: 'lastname',
  records: [],
};
export const mockUsersList: User[] = [
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

export const mockUserService = {
  findAll: jest.fn(() => ['test']),
  findById: jest.fn((idDto: IdParamDto): User => {
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
  delete: jest.fn((idDto: IdParamDto): User => {
    return mockUsersList.find((user) => user.id === idDto.id);
  }),
  findByEmail: jest.fn(),
};
