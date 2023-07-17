import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { setupSwaggerDoc } from '@Core/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwaggerDoc(app);

  const configService = app.get(ConfigService);
  await app.listen(
    configService.get('SERVER_PORT'),
    configService.get('SERVER_HOST'),
  );
}
bootstrap();
