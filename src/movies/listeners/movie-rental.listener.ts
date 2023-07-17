import { OnEvent } from '@nestjs/event-emitter';

import { IdParamDto } from '@Core/dtos';

import { RentalActionDto } from '../dto';
import { RecordEntity } from '../entities';
import { MovieRentalService } from '../services';

export class MovieRentalListener implements Partial<MovieRentalService> {
  constructor(private movieRentalService: MovieRentalService) {}
  @OnEvent('movieRental.executeAction')
  async executeAction(
    idDto: IdParamDto,
    rentalActionDto: RentalActionDto,
  ): Promise<RecordEntity[]> {
    if (!idDto) throw new Error('No idDto provided');
    if (!rentalActionDto) throw new Error('No rentalActionDto provided');

    return await this.movieRentalService.executeAction(idDto, rentalActionDto);
  }

  @OnEvent('movieRental.getRecord')
  async getRecord(idDto: IdParamDto): Promise<RecordEntity[]> {
    if (!idDto) throw new Error('No idDto provided');

    return await this.movieRentalService.getRecord(idDto);
  }
}
