import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../movies/entities/movie.entity';
import { RecordEntity } from '../users/entities/record.entity';
import { User } from '../users/entities/users.entity';
import { MovieRentalService } from './movie-rental.service';

@Module({
  providers: [MovieRentalService],
  imports: [TypeOrmModule.forFeature([RecordEntity, User, MovieEntity])],
  exports: [MovieRentalService],
})
export class MovieRentalModule {}
