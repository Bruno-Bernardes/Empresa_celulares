import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteModule } from "./cliente/infra/persistence/module/ClienteModule";
import { PlanoModule } from "./plano/infra/persistence/module/PlanoModule";
import { AssinaturaModule } from "./assinatura/infra/persistence/module/AssinaturaModule";
import { ServicoGestao } from "./controllerGeral/ServiceGestao";

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5433,
      username: 'postgres',
      password: 'adm',
      database: 'loja',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClienteModule,
    PlanoModule,
    AssinaturaModule
  ],

  controllers:[ServicoGestao]
  
})
export class AppModule{}