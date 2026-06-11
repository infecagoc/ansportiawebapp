import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // All routes prefixed with /api/v1
  app.setGlobalPrefix('api/v1');

  // Global validation (DTOs + class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS — restrict to configured frontend origins
  const origins = (config.get<string>('CORS_ORIGINS') ?? 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim());
  app.enableCors({ origin: origins, credentials: true });

  const port = config.get<number>('API_PORT') ?? 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`ANSPORTIA API running on http://localhost:${port}/api/v1`);
}

bootstrap();
