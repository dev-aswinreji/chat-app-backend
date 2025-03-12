import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    cors: {
      origin: process.env.FRONTEND_URL!
    }
  })
  app.setGlobalPrefix('v1/api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(process.env.PORT!);
}
bootstrap();
