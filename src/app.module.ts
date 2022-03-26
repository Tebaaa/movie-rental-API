import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'teba',
      password: 'admin',
      database: 'movies_rental',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    MoviesModule,
  ],
})
export class AppModule {}
