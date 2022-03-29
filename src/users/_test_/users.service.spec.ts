import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UsersService } from '../users.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  preload: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of users', () => {
      const expectedList = {};
      usersRepository.find.mockReturnValue(expectedList);
      const list = service.findAll();
      expect(list).toEqual(expectedList);
    });
  });

  describe('findById', () => {
    describe('when user with Id exists', () => {
      it('should return the user object', async () => {
        const userId = 1;
        const expectedUser = {};
        usersRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findById(userId);
        expect(user).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const userId = 1;
        usersRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findById(userId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`User #${userId} not found`);
        }
      });
    });
  });
});
