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
import { RentalActionDto } from './dto/rental-action.dto';
import { IOrderInfo } from './interfaces/order-info.interface';

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

  private async buyMovie(user: User, movies: MovieEntity[]) {
    const total = movies.reduce((amount, movie) => {
      amount += movie.sale_price;
      return amount;
    }, 0);
    const movies_info = movies.map((movie) => {
      const movie_info = {
        title: movie.name,
        description: movie.description,
        price: movie.sale_price,
      };
      return JSON.stringify(movie_info);
    });
    const orderInfo: IOrderInfo = {
      total,
      movies,
      user,
      action: 'bought',
      movies_info,
    };
    return this.mailService.sendOrderInfo(orderInfo);
  }

  private async rentMovie(user: User, movies: MovieEntity[]) {
    const total = movies.reduce((amount, movie) => {
      amount += movie.rent_price;
      return amount;
    }, 0);
    const movies_info = movies.map((movie) => {
      const movie_info = {
        title: movie.name,
        description: movie.description,
        price: movie.sale_price,
      };
      return JSON.stringify(movie_info);
    });
    const orderInfo: IOrderInfo = {
      total,
      movies,
      user,
      action: 'rented',
      movies_info,
    };
    return this.mailService.sendOrderInfo(orderInfo);
  }

  private async returnMovie() {
    return 'returnMovie';
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
        return this.returnMovie();

      default:
        throw new BadRequestException(
          `action must be 'buy', 'rent' or 'return'`,
        );
    }
  }
}
