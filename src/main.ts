import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BadRequestException, ValidationPipe } from "@nestjs/common";

import './config/jwt.config';

import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./filter/http-exception.filter";

async function startMain(){
  const PORT = process.env.APP_PORT || 7000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header'
    }, 'JWT-auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (errors) => new BadRequestException(errors)
  }));

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    credentials: true
  });

  await app.listen(PORT, () => console.log(`Start back (${PORT}-port)`));
}

startMain();
