import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { TagEntity } from './entities/tags.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './services/movies.service';
import { RentalServices } from './services/rental-services.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, TagEntity])],
  controllers: [MoviesController],
  providers: [MoviesService, RentalServices],
})
export class MoviesModule {}
