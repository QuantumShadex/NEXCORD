import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim());

  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push('http://localhost', 'http://localhost:3000');
  }

  const uniqueOrigins = [...new Set(allowedOrigins)];

  app.enableCors({ origin: uniqueOrigins });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('NEXCORD API')
    .setDescription('NEXCORD - Where Communities Evolve')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 4000);
  logger.log(`NEXCORD API running on port ${process.env.PORT || 4000}`);
}
bootstrap();
