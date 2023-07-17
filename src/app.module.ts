import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { DataSourceConfig } from '@Core/config';
import { UsersModule } from '@Users/users.module';
import { MoviesModule } from '@Movies/movies.module';
import { AuthModule } from '@Auth/auth.module';
import { AccountModule } from '@Account/account.module';
import { MailModule } from '@Mail/mail.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
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
