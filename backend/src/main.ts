import { APP_INTERCEPTOR, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.use(json({limit : '50mb'}));
  app.use(urlencoded({limit : '50mb'}));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
