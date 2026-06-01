import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './AppController';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ASSINATURA_SERVICE',//esse é a indentificação desse injeção
        transport: Transport.RMQ,
        options:{
          urls:['amqp://admin:admin@localhost:5672'],
          queue: 'fila_gestao',//é o nome da fila do rabbitMQ que ele se conecta
          queueOptions: {durable: true},
        } 
      },
      {
        name: 'PLANO_SERVICE',//esse é a indentificação desse injeção
        transport: Transport.RMQ,
        options:{
          urls:['amqp://admin:admin@localhost:5672'],
          queue: 'fila_plano',//é o nome da fila do rabbitMQ que ele se conecta
          queueOptions: {durable: true},
        }
      },
    ])
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
