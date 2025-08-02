import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
  app.setGlobalPrefix('api/v1/');
  const config = new DocumentBuilder()
    .setTitle('Nawy Apartments API')
    .setDescription('API documentation for Nawy Apartments system')
    .setVersion('1.0.0')
    .addServer('http://localhost:3001')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
