import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { TagEntity } from './entities/tags.entity';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { RecordEntity } from 'src/users/entities/record.entity';
import { User } from 'src/users/entities/users.entity';
import { MovieRentalService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieEntity,
      TagEntity,
      RecordEntity,
      User,
      MovieEntity,
    ]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRentalService],
  exports: [MoviesService, MovieRentalService],
})
export class MoviesModule {}
