/* eslint-disable prettier/prettier */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { PORT } from './env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle('bee')
    .setDescription('The Bee API description')
    .setVersion('1.0')
    .addTag('bee')
    .build()

  const documentFactory = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(PORT ?? 8000)
}
bootstrap()