import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allows requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow specific HTTP methods
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Allow-Origin',
    ], // Allow required headers
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header(
        'Access-Control-Allow-Headers',
        req.headers['access-control-request-headers'],
      );
      res.sendStatus(204);
    } else {
      next();
    }
  });
  app.setGlobalPrefix('api');
  // Protect Swagger with a username and password
  app.use(
    ['/docs', '/docs-json'], // Protect Swagger UI and JSON endpoint
    basicAuth({
      users: { admin: 'password123' }, // Change this to a strong username & password
      challenge: true,
    }),
  );
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Gurus Online Learning API')
    .setDescription('API documentation for my NestJS app')
    .setVersion('1.0')
    .addBearerAuth() // If you have authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // Critical Railway configuration
  await app.listen(process.env.PORT || 3333, '0.0.0.0');
  console.log(`Running on ${await app.getUrl()}`);
}
bootstrap();
