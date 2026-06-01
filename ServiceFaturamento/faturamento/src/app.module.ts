import { Module } from '@nestjs/common';
import { PagamentoController } from './pagamento/adapters/controller/PagamentoController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoModule } from './pagamento/infra/persistence/module/PagamentoModule';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [

      TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5434,
      username: 'postgres',
      password: 'adm',
      database: 'pagamento',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PagamentoModule
  ],
  providers: [],
})
export class AppModule {}
