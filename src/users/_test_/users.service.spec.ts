import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../create-mock-repository.class';
import { CreateUserDto } from '../dto/create-user.dto';
import { IdDto } from '../dto/id.dto';
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
        const mockIdDto: IdDto = { id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2' };
        const expectedUser = {};
        usersRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findById(mockIdDto);
        expect(user).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const mockIdDto: IdDto = { id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2' };
        usersRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findById(mockIdDto);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`User #${mockIdDto.id} not found`);
        }
      });
    });
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      email: 'admin@mail.com',
      password: '123',
      admin: true,
      client: true,
      name: 'name',
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
          expect(err.message).toEqual('Email is already registered');
        }
      });
    });
  });

  describe('update', () => {
    const mockIdDto: IdDto = { id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2' };
    const updateUser = { lastname: 'lastname' };
    describe('when user with id exists', () => {
      it('should return an updated user', async () => {
        const expectedSavedUser = {};
        usersRepository.preload.mockReturnValue(expectedSavedUser);
        usersRepository.save.mockReturnValue(expectedSavedUser);
        const savedUser = await service.update(mockIdDto, updateUser);
        expect(savedUser).toEqual(expectedSavedUser);
      });
    });
    describe('otherwhise', () => {
      it('should throw a NotFoundException', async () => {
        try {
          usersRepository.preload.mockReturnValue(undefined);
          await service.update(mockIdDto, updateUser);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User #${mockIdDto.id} not found`);
        }
      });
    });
  });

  describe('delete', () => {
    const mockIdDto: IdDto = { id: '2d0ef3e8-c253-4c6a-97b7-fbf8953ce0a2' };
    describe('when user with id exists', () => {
      it('should return a deleted user', async () => {
        const expectedUser = {};
        usersRepository.findOne.mockReturnValue(expectedUser);
        usersRepository.remove.mockReturnValue(expectedUser);
        const deletedUser = await service.delete(mockIdDto);
        expect(deletedUser).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw a NotFoundException', async () => {
        try {
          usersRepository.findOne.mockReturnValue(undefined);
          await service.delete(mockIdDto);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User #${mockIdDto.id} not found`);
        }
      });
    });
  });

  describe('findByUsername', () => {
    const email = 'mail@mail.com';
    describe('when email exists', () => {
      it('should return a user object', async () => {
        const expectedUser = {};
        usersRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findByEmail(email);
        expect(user).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw a NotFoundException', async () => {
        usersRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findByEmail(email);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`There's no user with that email`);
        }
      });
    });
  });
});
