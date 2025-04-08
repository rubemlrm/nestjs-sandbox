import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Recipes API')
    .setDescription('Recipes API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Tell class-validator to use NestJS's DI container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(8080);
}
bootstrap();
