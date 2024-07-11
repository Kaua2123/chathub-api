import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // pipe aplicado em todas as requisições HTTP

  app.enableCors({
    origin: '*',
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
