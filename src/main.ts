import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('Calculadora de proposta')
    .setDescription('API desenvolvida para criação de propostas para contratação de energia elétrica.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, options);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
