import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // allow all origins
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Exam Api')
    .setDescription(
      'The exam API allows you to\n' +
        ' create, read, update and delete classes\n' +
        ' create, read, update and delete exams\n' +
        ' create, read, update and delete questions\n' +
        'and more....',
    )
    .setVersion('1.0')
    .addTag('Exam Api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000).then(() => {
    console.log('Server is running on port 3000');
  });
}
bootstrap();
