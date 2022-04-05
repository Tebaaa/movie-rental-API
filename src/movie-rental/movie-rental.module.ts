import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from '../users/entities/record.entity';
import { MovieRentalService } from './movie-rental.service';

@Module({
  providers: [MovieRentalService],
  imports: [TypeOrmModule.forFeature([RecordEntity])],
  exports: [MovieRentalService],
})
export class MovieRentalModule {}
