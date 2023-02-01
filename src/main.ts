import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MainModule } from './main.module';

function initializeSwaggerDocumentation(
  app: INestApplication,
  swaggerPath: string,
) {
  const config = new DocumentBuilder()
    .setTitle('CCET API ')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(swaggerPath, app, document);
}

async function bootstrap() {
  const swaggerPath = '/api/swagger';

  const app = await NestFactory.create(MainModule, {
    cors: { origin: '*' },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  initializeSwaggerDocumentation(app, swaggerPath);

  await app.listen(3000, '0.0.0.0');

  const url = await app.getUrl();

  Logger.log(`Application is running on: ${url}`);

  Logger.log(`Swagger path: ${url}${swaggerPath}`);
}

bootstrap();
