import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import './config/jwt.config';

import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";
import { GlobalExceptionFilter } from "./filter/http-exception.filter";

async function startMain(){
  const PORT = process.env.PORT || 5050;
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

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Start back (${PORT}-port)`));
}

startMain();
