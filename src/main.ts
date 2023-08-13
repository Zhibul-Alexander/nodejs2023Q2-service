import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

import { AppModule } from './app.module';

import { DOCUMENT_CONFIG } from './constants';

async function bootstrap() {
  const PORT: number = Number(process.env.PORT) || 4000;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(DOCUMENT_CONFIG.TITLE)
    .setDescription(DOCUMENT_CONFIG.DESCRIPTION)
    .setVersion(DOCUMENT_CONFIG.VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
  console.log(`Server is running on: http://localhost:${PORT}`);
}

bootstrap();
