import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/';
import { UsersController } from './controllers/';
import { UsersService } from './services/';
import { UsersRepository } from './repositories';
import { UsersListener } from './listeners';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersListener],
})
export class UsersModule {}
