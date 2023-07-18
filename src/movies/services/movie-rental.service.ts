import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { User } from '@Users/entities';
// import { MailService } from '@Mail/services';
import { IdParamDto } from '@Core/dtos';

import { MovieEntity } from '../entities/';
import { OrderInfo } from '../classes/';
import { RentalActionDto } from '../dto/';
import { MoviesRepository, RecordsRepository } from '../repositories';

@Injectable()
export class MovieRentalService {
  constructor(
    private recordRepository: RecordsRepository,
    private moviesRepository: MoviesRepository,
    // private mailService: MailService,
    private eventEmitter: EventEmitter2,
  ) {}

  getRecord(idDto: IdParamDto) {
    //TODO: Make method in recordRepository
    return this.recordRepository.find({
      where: { user_id: idDto.id },
      relations: ['movie'],
    });
  }

  async addToRecord(user: User, movie: MovieEntity, action: 'buy' | 'rent') {
    const rent = action === 'rent';
    const buy = action === 'buy';
    const user_id = user.id;
    const movie_id = movie.id;
    const record = this.recordRepository.create({
      user_id,
      buy,
      rent,
      movie_id,
    });
    return await this.recordRepository.save(record);
  }

  async buyMovie(user: User, movies: MovieEntity[]) {
    const orderInfo = new OrderInfo(movies, user, 'bought');
    const updatedMovies = await Promise.all(
      movies.map(async (movie) => {
        const { stock, id, name } = movie;
        if (stock) {
          return await this.moviesRepository.update(id, {
            available: stock !== 1,
            stock: stock - 1,
          });
        }
        throw new ConflictException(`Movie #${id} '${name}' has no stock left`);
      }),
    );
    // await this.mailService.sendOrderInfo(orderInfo);
    const records = await Promise.all(
      movies.map(async (movie) => {
        return await this.addToRecord(user, movie, 'buy');
      }),
    );
    return records;
  }

  async rentMovie(user: User, movies: MovieEntity[]) {
    const orderInfo = new OrderInfo(movies, user, 'rented');
    const updatedMovies = await Promise.all(
      movies.map(async (movie) => {
        const { stock, id, name } = movie;
        if (stock) {
          return await this.moviesRepository.update(id, {
            available: stock !== 1,
            stock: stock - 1,
          });
        }
        throw new ConflictException(`Movie #${id} '${name}' has no stock left`);
      }),
    );
    // await this.mailService.sendOrderInfo(orderInfo);
    const records = await Promise.all(
      movies.map(async (movie) => {
        return await this.addToRecord(user, movie, 'rent');
      }),
    );
    return records;
  }

  async returnMovie(user: User, moviesId: string[]) {
    const user_id = user.id;
    const records = await Promise.all(
      moviesId.map(async (movie_id) => {
        const record = await this.recordRepository.findOneRentedMovie(
          movie_id,
          user_id,
        );
        if (record && record.rent) {
          return record;
        }
        throw new NotFoundException(
          `You haven't rented movie #${movie_id}, movie doesn't exist or is already returned`,
        );
      }),
    );
    const movies = await Promise.all(
      moviesId.map((id) => {
        return this.moviesRepository.findOneMovieById(id);
      }),
    );
    const updatedMovies = movies.map((movie) => {
      const { stock, id } = movie;
      this.moviesRepository.update(id, { available: true, stock: stock + 1 });
    });
    return await Promise.all(
      records.map(async (record) => {
        return await this.recordRepository.remove(record);
      }),
    );
  }

  async executeAction(idDto: IdParamDto, rentalActionDto: RentalActionDto) {
    const { action, moviesId } = rentalActionDto;
    const actionIsBuy = action === 'buy';
    const actionIsRent = action === 'rent';
    const actionIsReturn = action === 'return';
    //TODO: Use event emitter
    const [user] = await this.eventEmitter.emitAsync(
      'users.getOneById',
      idDto.id,
    );
    if (!(user instanceof User)) {
      throw new NotFoundException(`User #${idDto.id} not found`);
    }
    const movies = await Promise.all(
      moviesId.map(async (id) => {
        const movie = await this.moviesRepository.findOneMovieById(id);
        if (movie) {
          return movie;
        }
        throw new NotFoundException(`Movie #${id} not found`);
      }),
    );
    switch (true) {
      case actionIsBuy:
        return this.buyMovie(user, movies);
      case actionIsRent:
        return this.rentMovie(user, movies);

      case actionIsReturn:
        return this.returnMovie(user, moviesId);

      default:
        throw new BadRequestException(
          `action must be 'buy', 'rent' or 'return'`,
        );
    }
  }
}
