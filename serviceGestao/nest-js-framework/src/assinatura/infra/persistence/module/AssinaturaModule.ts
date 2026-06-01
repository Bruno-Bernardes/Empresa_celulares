import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AssinaturaEntidade } from "../entity/AssinaturaEntidade"
import { ClienteModule } from "../../../../cliente/infra/persistence/module/ClienteModule"
import { PlanoModule } from "../../../../plano/infra/persistence/module/PlanoModule"
import { CadastraAssinatura } from "../../../application/use_case/CadastraAssinatura"
import { RetornaAssinatura } from "../../../application/use_case/RetornaAssinatura"
import { RepositorioPlano } from "../../../../plano/adapters/gateways/RepositorioPlano"
import { RepositorioCliente } from "../../../../cliente/adapters/gateways/RepositorioCliente"
import { AssinaturaEntityMapper } from "../../../adapters/mappers/AssinaturaEntityMapper"
import { RepositorioAssinaturaReq } from "../repository/RepositorioAssinaturaReq"
import { RepositorioAssinatura } from "../../../adapters/gateways/RepositorioAssinatura"
import { AssinaturaController } from "../../../adapters/controller/AssinaturaController"
import { EditaAssinatura } from "../../../application/use_case/EditaAssinatura"

@Module({
    imports:[TypeOrmModule.forFeature([AssinaturaEntidade]), ClienteModule, PlanoModule],
    controllers:[AssinaturaController],
    providers:[
        AssinaturaEntityMapper,
        RepositorioAssinaturaReq,
        {
            provide: RepositorioAssinatura,
            useFactory: (repositorioReq: RepositorioAssinaturaReq, mapper: AssinaturaEntityMapper) => {
                return new RepositorioAssinatura(repositorioReq, mapper)
            },
            inject:[RepositorioAssinaturaReq, AssinaturaEntityMapper]
        },
        {
            provide: 'ICADASTRA_ASSINATURA',
            useFactory:(repoAss: RepositorioAssinatura, repoClin: RepositorioCliente, repoPlan: RepositorioPlano) =>{
                return new CadastraAssinatura(repoAss, repoClin, repoPlan)
            },
            inject:[RepositorioAssinatura, RepositorioCliente, RepositorioPlano]
        },
        {
            provide: 'IRETORNA_ASSINATURA',
            useFactory:(repo: RepositorioAssinatura) =>{
                return new RetornaAssinatura(repo)
            },
            inject:[RepositorioAssinatura]
        },
        {
            provide: 'IEDITA_ASSINATURA',
            useFactory:(repo: RepositorioAssinatura) => {
                return new EditaAssinatura(repo);
            },
            inject:[RepositorioAssinatura]
        }
    ],
    
    exports: ['ICADASTRA_ASSINATURA', 'IRETORNA_ASSINATURA','IEDITA_ASSINATURA']
    

})

export class AssinaturaModule {}