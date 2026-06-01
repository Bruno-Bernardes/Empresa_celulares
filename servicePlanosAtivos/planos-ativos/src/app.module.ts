import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanosModule } from './cachePlano/infra/persistence/module/PlanosModule';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5435,
      username: 'postgres',
      password: 'adm',
      database: 'cachePlanos',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlanosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
