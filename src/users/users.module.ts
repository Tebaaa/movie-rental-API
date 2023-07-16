import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesModule } from '@Movies/movies.module';

import { RecordEntity, User } from './entities/';
import { UsersController } from './controllers/';
import { UsersService } from './services/';

@Module({
  imports: [TypeOrmModule.forFeature([User, RecordEntity]), MoviesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
