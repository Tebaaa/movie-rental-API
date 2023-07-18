import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { MailService } from '@Mail/services';

import {
  MoviesRepository,
  RecordsRepository,
  TagsRepository,
} from './repositories';
import { MovieEntity, RecordEntity, TagEntity } from './entities/';
import { MovieRentalService, MoviesService } from './services';
import { MovieRentalListener } from './listeners';
import { MoviesController } from './controllers/';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, TagEntity, RecordEntity])],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    MovieRentalService,
    RecordsRepository,
    MoviesRepository,
    TagsRepository,
    // MailService,
    MovieRentalListener,
  ],
})
export class MoviesModule {}
