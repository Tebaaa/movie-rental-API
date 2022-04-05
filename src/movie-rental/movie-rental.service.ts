import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../movies/entities/movie.entity';
import { MoviesService } from '../movies/movies.service';
import { IdDto } from '../users/dto/id.dto';
import { RecordEntity } from '../users/entities/record.entity';
import { User } from '../users/entities/users.entity';
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
  ) {}

  getRecord(idDto: IdDto) {
    return this.recordRepository.find({
      where: { user_id: idDto.id },
      relations: ['movie'],
    });
  }

  private async buyMovie(idDto: IdDto, movies: MovieEntity[]) {
    const user = await this.userRepository.findOne(idDto.id);
    return movies;
  }

  private async rentMovie() {
    return 'rentMovie';
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
        return this.buyMovie(idDto, movies);
      case actionIsRent:
        return this.rentMovie();

      case actionIsReturn:
        return this.returnMovie();

      default:
        throw new BadRequestException(
          `action must be 'buy', 'rent' or 'return'`,
        );
    }
  }
}
