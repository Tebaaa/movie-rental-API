import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../create-mock-repository.class';
import { MailService } from '../../mail/mail.service';
import { MovieEntity } from '../../movies/entities/movie.entity';
import { RecordEntity } from '../../users/entities/record.entity';
import { User } from '../../users/entities/users.entity';
import { mockIdDto, mockUser } from '../../_test_mocks_/user-service.mock';
import { RentalActionDto } from '../dto/rental-action.dto';
import { MovieRentalService } from '../movie-rental.service';

describe('MovieRentalService', () => {
  let service: MovieRentalService;
  let moviesRepository: MockRepository;
  let usersRepository: MockRepository;
  let recordsRepository: MockRepository;

  const mockMailService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRentalService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(RecordEntity),
          useValue: createMockRepository(),
        },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<MovieRentalService>(MovieRentalService);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
    usersRepository = module.get<MockRepository>(getRepositoryToken(User));
    recordsRepository = module.get<MockRepository>(
      getRepositoryToken(RecordEntity),
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('excecuteAction', () => {
    describe(`when user with id doesn't exist`, () => {
      it('should throw a NotFoundException', async () => {
        usersRepository.findOne.mockReturnValue(undefined);
        const rentalActionDto: RentalActionDto = {
          action: 'buy',
          moviesId: [1],
        };
        try {
          await service.executeAction(mockIdDto, rentalActionDto);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`User #${mockIdDto.id} not found`);
        }
      });
    });
    describe(`when a movie doesn't exist`, () => {
      it('should throw a NotFoundException', async () => {
        moviesRepository.findOne.mockReturnValue(undefined);
        const user = {};
        usersRepository.findOne.mockReturnValue(user);
        const rentalActionDto: RentalActionDto = {
          action: 'buy',
          moviesId: [1],
        };
        try {
          await service.executeAction(mockIdDto, rentalActionDto);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toContain(`Movie #`);
        }
      });
    });
    describe('otherwise', () => {
      describe(`when action is 'buy'`, () => {
        it('should call buyMovie method', async () => {
          const rentalActionDto: RentalActionDto = {
            action: 'buy',
            moviesId: [1],
          };
          const expectedReturn = {};
          const buyMovie = jest.spyOn(
            MovieRentalService.prototype as any,
            'buyMovie',
          );
          buyMovie.mockReturnValue(expectedReturn);
          usersRepository.findOne.mockReturnValue({});
          moviesRepository.findOne.mockReturnValue({});
          const returnedValue = await service.executeAction(
            mockIdDto,
            rentalActionDto,
          );
          expect(buyMovie).toHaveBeenCalled();
          expect(returnedValue).toEqual(expectedReturn);
        });
      });
      describe(`when action is 'rent'`, () => {
        it('should call rentMovie method', async () => {
          const rentalActionDto: RentalActionDto = {
            action: 'rent',
            moviesId: [1],
          };
          const expectedReturn = {};
          const rentMovie = jest.spyOn(
            MovieRentalService.prototype as any,
            'rentMovie',
          );
          rentMovie.mockReturnValue(expectedReturn);
          usersRepository.findOne.mockReturnValue({});
          moviesRepository.findOne.mockReturnValue({});
          const returnedValue = await service.executeAction(
            mockIdDto,
            rentalActionDto,
          );
          expect(rentMovie).toHaveBeenCalled();
          expect(returnedValue).toEqual(expectedReturn);
        });
      });
      describe(`when action is 'return'`, () => {
        it('should call returnMovie method', async () => {
          const rentalActionDto: RentalActionDto = {
            action: 'return',
            moviesId: [1],
          };
          const expectedReturn = {};
          const returnMovie = jest.spyOn(
            MovieRentalService.prototype as any,
            'returnMovie',
          );
          returnMovie.mockReturnValue(expectedReturn);
          usersRepository.findOne.mockReturnValue({});
          moviesRepository.findOne.mockReturnValue({});
          const returnedValue = await service.executeAction(
            mockIdDto,
            rentalActionDto,
          );
          expect(returnMovie).toHaveBeenCalled();
          expect(returnedValue).toEqual(expectedReturn);
        });
      });
      describe('otherwise', () => {
        it('should throw a BadRequestException', async () => {
          moviesRepository.findOne.mockReturnValue({});
          const user = {};
          usersRepository.findOne.mockReturnValue(user);
          const rentalActionDto = {
            action: 'other' as any,
            moviesId: [1],
          };
          try {
            await service.executeAction(mockIdDto, rentalActionDto);
          } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toEqual(
              `action must be 'buy', 'rent' or 'return'`,
            );
          }
        });
      });
    });
  });
  describe('getRecord', () => {
    it('should return a RecordEntity object', async () => {
      const expectedReturn = {};
      recordsRepository.find.mockReturnValue(expectedReturn);
      const returnedValue = service.getRecord(mockIdDto);
      expect(returnedValue).toEqual(expectedReturn);
    });
  });

  describe('addToRecord', () => {
    it('should save a record', async () => {
      const expectedReturn = {};
      const mockMovie = {} as MovieEntity;
      recordsRepository.save.mockReturnValue(expectedReturn);
      const returnedValue = await service.addToRecord(
        mockUser,
        mockMovie,
        'buy',
      );
      expect(returnedValue).toEqual(expectedReturn);
    });
  });
});
