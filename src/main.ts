import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(`The server is running on port: ${port}`);
};
bootstrap();
