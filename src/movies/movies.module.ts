import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecordEntity, User } from '@Users/entities/';

import { MovieEntity, TagEntity } from './entities/';
import { MoviesController } from './controllers/';
import { MovieRentalService, MoviesService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, TagEntity, RecordEntity, User]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRentalService],
  exports: [MoviesService, MovieRentalService],
})
export class MoviesModule {}
