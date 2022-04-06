import { IdDto } from '../users/dto/id.dto';
import { User } from '../users/entities/users.entity';

export const mockIdDto: IdDto = { id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2' };
export const mockUser: User = {
  id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2',
  email: 'email@example.com',
  password: 'password',
  name: 'name',
  admin: true,
  client: true,
  lastname: 'lastname',
  record: [],
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
