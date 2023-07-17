import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function setupSwaggerDoc(app: INestApplication): void {
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
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  };
  SwaggerModule.setup('docs', app, document, customOptions);
}
