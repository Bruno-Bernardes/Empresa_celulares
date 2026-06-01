import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CachePlanoEntidade } from "../entity/CachePlanosEntity";
import { CacheEntityDomainMapper } from "../../../adapters/mapper/CacheEntityDomainMapper";
import { RepositorioPlanosReq } from "../repository/RepositorioPlanosReq";
import { RepositorioPlanos } from "../../../adapters/gateways/RepositorioPlanos";
import { ListaPlanos } from "../../../application/use_case/ListaPlanos";
import { ControllerPlanos } from "../../../adapters/controller/ControllerPlanos";
import { Transport, ClientsModule, ClientProxy } from "@nestjs/microservices";
import { DeletaCachePlano } from "../../../application/use_case/DeletaCachePlano";

@Module({

    imports:[TypeOrmModule.forFeature([CachePlanoEntidade]),

        ClientsModule.register([{         
            name: 'PLANOS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://admin:admin@localhost:5672'],
                queue: 'fila_broker',
                queueOptions: { durable: true }
            }
        }]),
    ],
    controllers:[ControllerPlanos],
    providers:[
        CacheEntityDomainMapper,
        RepositorioPlanosReq,

        {
            provide: RepositorioPlanos,
            useFactory:(repositorioReq: RepositorioPlanosReq, mapper: CacheEntityDomainMapper) => {
                return new RepositorioPlanos(repositorioReq, mapper)
            },
            inject:[RepositorioPlanosReq, CacheEntityDomainMapper]
        },

        {
            provide: 'ILISTA_PLANO',
            useFactory:(repo: RepositorioPlanos, broker: ClientProxy) =>{
                return new ListaPlanos(repo, broker)
            },
            inject:[RepositorioPlanos, 'PLANOS_SERVICE']
        },

        {
            provide: 'IDELETA_PLANO',
            useFactory:(repo: RepositorioPlanos)=>{
                return new DeletaCachePlano(repo)
            },
            inject:[RepositorioPlanos]
        },
    ],
    exports:['ILISTA_PLANO', 'IDELETA_PLANO']

})
export class PlanosModule{}