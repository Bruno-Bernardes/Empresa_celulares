import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ClienteEntidade } from "../entity/ClienteEntidade"
import { RepositorioClienteReq } from "../repository/RepositorioClienteReq"
import { CadastraCliente } from "../../../application/use_case/CadastraCliente"
import { ListarCliente } from "../../../application/use_case/ListarCliente"
import { EditarCliente } from "../../../application/use_case/EditarCliente"
import { ClienteEntityMapper } from "../../../adapters/mappers/clienteEntityMapper"
import { RepositorioCliente } from "../../../adapters/gateways/RepositorioCliente"

@Module({
    imports:[TypeOrmModule.forFeature([ClienteEntidade])],
    
    providers:[
        ClienteEntityMapper,
        RepositorioClienteReq,
        {
            provide: RepositorioCliente,
            useFactory:(repositorioReq: RepositorioClienteReq, mapper: ClienteEntityMapper) =>{
                return new RepositorioCliente(repositorioReq, mapper)
            },
            inject:[RepositorioClienteReq, ClienteEntityMapper]
        },
        {
          provide: 'ICADASTRA_CLIENTE',
          useFactory:(repo: RepositorioCliente) => {
            return new CadastraCliente(repo)
          },
          inject:[RepositorioCliente]  
        },
        {
          provide: 'ILISTA_CLIENTE',
          useFactory:(repo: RepositorioCliente) => {
            return new ListarCliente(repo)
          },
          inject:[RepositorioCliente]  
        },
        {
          provide: 'IEDITA_CLIENTE',
          useFactory:(repo: RepositorioCliente) => {
            return new EditarCliente(repo)
          },
          inject:[RepositorioCliente]  
        },
    ],
    
    exports: ['ICADASTRA_CLIENTE', 'ILISTA_CLIENTE', 'IEDITA_CLIENTE', RepositorioCliente]
})

export class ClienteModule {}