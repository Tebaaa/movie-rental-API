import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //TODO: Move config to config module
  const config = new DocumentBuilder()
    .setTitle('Movie Rental API')
    .setDescription(
      'API that handle movies requests. It shows a list of movies or a single movie if ID is provided.' +
        ' Also, if user has a client role, they can buy, rent or return a movie. ' +
        'If a user is admin, they can manage/create movies and other users.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', bearerFormat: 'Token', scheme: 'bearer' },
      'access-token',
    )
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('docs', app, document, customOptions);

  const configService = app.get(ConfigService);
  await app.listen(
    configService.get('SERVER_PORT'),
    configService.get('SERVER_HOST'),
  );
}
bootstrap();
