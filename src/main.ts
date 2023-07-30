import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT: number = Number(process.env.PORT) || 4000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
  console.log(`Server is running on: http://localhost:${PORT}`);
}

bootstrap();
