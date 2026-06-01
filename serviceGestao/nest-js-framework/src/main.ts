import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options:{
      urls:['amqp://admin:admin@localhost:5672'],
      queue: 'fila_gestao',
      queueOptions: { durable: true },
    
    },
  })
  await app.startAllMicroservices();
  await app.listen(8080);
}
bootstrap();