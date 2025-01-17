/* eslint-disable prettier/prettier */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_CORS_ORIGIN } from './env.config';

process.loadEnvFile();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = API_CORS_ORIGIN.split(',')
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('bee')
    .setDescription('The Bee API description')
    .setVersion('1.0')
    .addTag('bee')
    .addCookieAuth('access_token', { type: 'http' })
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT || 5000;
  await app.listen(port);
}

bootstrap();
