import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { MovieEntity } from '../movies/entities/movie.entity';
import { IdDto } from '../users/dto/id.dto';
import { RecordEntity } from '../users/entities/record.entity';
import { User } from '../users/entities/users.entity';
import { OrderInfo } from './classes/order-info.class';
import { RentalActionDto } from './dto/rental-action.dto';

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

  // private async addToRecord(user: User, movie: MovieEntity) {
  // }

  private async buyMovie(user: User, movies: MovieEntity[]) {
    const orderInfo = new OrderInfo(movies, user, 'bought');
    await this.mailService.sendOrderInfo(orderInfo);
  }

  private async rentMovie(user: User, movies: MovieEntity[]) {
    const orderInfo = new OrderInfo(movies, user, 'rented');
    return this.mailService.sendOrderInfo(orderInfo);
  }

  private async returnMovie(user: User, moviesId: number[]) {
    const records = await Promise.all(
      moviesId.map(async (movie_id) => {
        const movie = await this.recordRepository.findOne({ movie_id });
        if (movie && movie.rented) {
          return movie;
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
    await Promise.all(
      records.map(async (record) => {
        return await this.recordRepository.remove(record);
      }),
    );
    return updatedMovies;
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
