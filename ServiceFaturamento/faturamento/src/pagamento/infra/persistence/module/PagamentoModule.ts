import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PagamentoEntidade } from "../entity/PagamentoEntidade"
import { CadastraPagamento } from "../../../application/use_case/CadastraPagamento"
import { PagamentoEntityMapper } from "../../../adapters/mappers/PagamentoEntityMapper"
import { RepositorioPagamentoReq } from "../repository/RepositorioPagamentoReq"
import { RepositorioPagamento } from "../../../adapters/gateways/RepositorioPagamento"
import { ClientProvider, ClientProxy, ClientsModule, Transport } from "@nestjs/microservices"
import { PagamentoController } from "../../../adapters/controller/PagamentoController"

@Module({
    imports:[
        TypeOrmModule.forFeature([PagamentoEntidade]),
    
            ClientsModule.register([{         
            name: 'FATURAMENTO_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://admin:admin@localhost:5672'],
                queue: 'fila_broker',
                queueOptions: { durable: true }
            }
        }])
    ],
    controllers:[PagamentoController],
    providers:[
        PagamentoEntityMapper,
        RepositorioPagamentoReq,
        {
            provide: RepositorioPagamento,
            useFactory:(repositorioReq: RepositorioPagamentoReq, mapper: PagamentoEntityMapper) => {
                return new RepositorioPagamento(repositorioReq, mapper)
            },
            inject:[RepositorioPagamentoReq, PagamentoEntityMapper],
        },
        {
            provide: 'ICADASTRA_PAGAMENTO',
            useFactory:(repoPag: RepositorioPagamento, broker: ClientProxy) => {
                return new CadastraPagamento(repoPag, broker)
            },
            inject:[RepositorioPagamento, 'FATURAMENTO_SERVICE']
        },
    ],
    exports: ['ICADASTRA_PAGAMENTO']
})

export class PagamentoModule {}