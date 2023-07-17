import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { JwtAuthGuard } from '../../src/auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../src/movies/guards/admin.guard';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { UsersModule } from '../../src/users/users.module';

describe('[Feature] Users - /users', () => {
  let app: INestApplication;
  const user = {
    username: 'name',
    password: 'pass',
    role: 'admin',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'teba',
          password: 'admin',
          database: 'movies_rental_test',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
      providers: [
        { provide: JwtAuthGuard, useValue: jest.fn(() => true) },
        { provide: AdminGuard, useValue: jest.fn(() => true) },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('Get all [GET /]');
  it.todo('Get by id [GET /:id]');
  it.todo('Create [POST /]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
