import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '@Users/users.module';
import { MoviesModule } from '@Movies/movies.module';
import { AuthModule } from '@Auth/auth.module';
import { AccountModule } from '@Account/account.module';
import { MailModule } from '@Mail/mail.module';
import { DataSourceConfig } from './config/';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    MoviesModule,
    AuthModule,
    AccountModule,
    MailModule,
  ],
})
export class AppModule {}
