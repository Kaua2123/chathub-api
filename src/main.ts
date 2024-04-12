import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // pipe aplicado em todas as requisições HTTP

  await app.listen(3000, () => {
    console.log('server online');
  });
}
bootstrap();
