import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../movies/entities/movie.entity';
import { IdDto } from '../users/dto/id.dto';
import { RecordEntity } from '../users/entities/record.entity';
import { RentalActionDto } from './dto/rental-action.dto';

@Injectable()
export class MovieRentalService {
  constructor(
    @InjectRepository(RecordEntity)
    private recordRepository: Repository<RecordEntity>,
  ) {}

  getRecord(idDto: IdDto) {
    return this.recordRepository.find({
      where: { user_id: idDto.id },
      relations: ['movie'],
    });
  }

  private async buyMovie() {
    return 'buy movie';
  }

  private async rentMovie() {
    return 'rentMovie';
  }

  private async returnMovie() {
    return 'returnMovie';
  }

  executeAction(idDto: IdDto, rentalActionDto: RentalActionDto) {
    const actionIsBuy = rentalActionDto.action === 'buy';
    const actionIsRent = rentalActionDto.action === 'rent';
    const actionIsReturn = rentalActionDto.action === 'return';
    switch (true) {
      case actionIsBuy:
        return this.buyMovie();

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
