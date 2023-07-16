import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { MailModule } from './mail/mail.module';
import { MovieRentalModule } from './movie-rental/movie-rental.module';
import { DataSourceConfig } from './config/data-source.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    MoviesModule,
    AuthModule,
    AccountModule,
    MailModule,
    MovieRentalModule,
  ],
})
export class AppModule {}
