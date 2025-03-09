import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as cookieParser from 'co'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  // app.use(cookieParser())
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
