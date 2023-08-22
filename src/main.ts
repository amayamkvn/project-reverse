import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitando las cors para peticiones externas
  app.enableCors();
  // Estableciendo el prefico /api en todas las peticiones
  app.setGlobalPrefix('api');
  // Cambiar el tamañoa maximo de subida
  //app.use(json({ limit: '512mb' }));
  // Habilitando las validaciones por los DTOs
  app.useGlobalPipes(new ValidationPipe());
  await app.listen( process.env.PORT || 3100);
}
bootstrap();
