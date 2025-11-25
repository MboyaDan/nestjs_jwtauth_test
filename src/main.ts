import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  //  Do NOT start the server during tests
  if (process.env.NODE_ENV !== 'test') {
    await app.listen(process.env.PORT ?? 3000);
    console.log(`App running on port ${process.env.PORT ?? 3000}`);
  }

  return app; // Important for testing
}

bootstrap();
