import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../create-mock-repository.class';
import { User } from '../entities/users.entity';
import { UsersService } from '../users.service';

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

  describe('create', () => {
    const createUserDto = {
      username: 'admin',
      password: '123',
      role: 'admin',
    };
    const expectedCreatedUser = {};
    describe('if username has not been used', () => {
      it('should return a saved user object', async () => {
        usersRepository.create.mockReturnValue(expectedCreatedUser);
        usersRepository.save.mockReturnValue(expectedCreatedUser);
        const createdUser = await service.create(createUserDto);
        expect(createdUser).toEqual(expectedCreatedUser);
      });
    });
    describe('otherwhise', () => {
      it('should throw a ConflictException', async () => {
        try {
          usersRepository.findOne.mockReturnValue(createUserDto);
          await service.create(createUserDto);
        } catch (err) {
          expect(err).toBeInstanceOf(ConflictException);
          expect(err.message).toEqual('Username has already been taken ');
        }
      });
    });
  });

  describe('update', () => {
    const userId = 1;
    const updateUser = { username: 'username' };
    describe('when user with id exists', () => {
      it('should return an updated user', async () => {
        const expectedSavedUser = {};
        usersRepository.preload.mockReturnValue(expectedSavedUser);
        usersRepository.save.mockReturnValue(expectedSavedUser);
        const savedUser = await service.update(userId, updateUser);
        expect(savedUser).toEqual(expectedSavedUser);
      });
    });
    describe('otherwhise', () => {
      it('should throw a NotFoundException', async () => {
        try {
          usersRepository.preload.mockReturnValue(undefined);
          await service.update(userId, updateUser);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User #${userId} not found`);
        }
      });
    });
  });

  describe('delete', () => {
    const userId = 1;
    describe('when user with id exists', () => {
      it('should return a deleted user', async () => {
        const expectedUser = {};
        usersRepository.findOne.mockReturnValue(expectedUser);
        usersRepository.remove.mockReturnValue(expectedUser);
        const deletedUser = await service.delete(userId);
        expect(deletedUser).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw a NotFoundException', async () => {
        try {
          usersRepository.findOne.mockReturnValue(undefined);
          await service.delete(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User #${userId} not found`);
        }
      });
    });
  });

  describe('findByUsername', () => {
    const username = 'username';
    describe('when username exists', () => {
      it('should return a user object', async () => {
        const expectedUser = {};
        usersRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findByUsername(username);
        expect(user).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw a NotFoundException', async () => {
        usersRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findByUsername(username);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Username doesn't exist`);
        }
      });
    });
  });
});
