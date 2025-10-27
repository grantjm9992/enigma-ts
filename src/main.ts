import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS if needed
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
      .setTitle('Boxing Gym API')
      .setDescription('Complete REST API for managing a boxing gym with exercises, routines, sessions, and users')
      .setVersion('1.0')
      .addTag('users', 'User management endpoints')
      .addTag('exercise-categories', 'Exercise category management')
      .addTag('tags', 'Tag management for exercises')
      .addTag('exercises', 'Exercise management')
      .addTag('routines', 'Routine management with embedded exercises')
      .addTag('sessions', 'Training session management')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api`);
}

bootstrap();