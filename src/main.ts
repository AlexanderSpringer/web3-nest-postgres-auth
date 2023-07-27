import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS
  app.use(cookieParser());
  await app.listen(process.env.REST_PORT || '80');
}
bootstrap();
