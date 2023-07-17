import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RecordEntity, User } from '@Users/entities';
import { MailService } from '@Mail/services';

import { MovieEntity } from '../entities/';
import { OrderInfo } from '../classes/';
import { RentalActionDto } from '../dto/';
import { IdDto } from '@Users/dto';

@Injectable()
export class MovieRentalService {
  constructor(
    @InjectRepository(RecordEntity)
    private recordRepository: Repository<RecordEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(MovieEntity)
    private moviesRepository: Repository<MovieEntity>,
    private mailService: MailService,
  ) {}

  getRecord(idDto: IdDto) {
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
    await this.mailService.sendOrderInfo(orderInfo);
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
    await this.mailService.sendOrderInfo(orderInfo);
    const records = await Promise.all(
      movies.map(async (movie) => {
        return await this.addToRecord(user, movie, 'rent');
      }),
    );
    return records;
  }

  async returnMovie(user: User, moviesId: number[]) {
    const user_id = user.id;
    const records = await Promise.all(
      moviesId.map(async (movie_id) => {
        const record = await this.recordRepository.findOne({
          movie_id,
          user_id,
          rent: true,
        });
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
        return this.moviesRepository.findOne(id);
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

  async executeAction(idDto: IdDto, rentalActionDto: RentalActionDto) {
    const { action, moviesId } = rentalActionDto;
    const actionIsBuy = action === 'buy';
    const actionIsRent = action === 'rent';
    const actionIsReturn = action === 'return';
    const user = await this.userRepository.findOne(idDto.id);
    if (!user) {
      throw new NotFoundException(`User #${idDto.id} not found`);
    }
    const movies = await Promise.all(
      moviesId.map(async (id) => {
        const movie = await this.moviesRepository.findOne(id);
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
