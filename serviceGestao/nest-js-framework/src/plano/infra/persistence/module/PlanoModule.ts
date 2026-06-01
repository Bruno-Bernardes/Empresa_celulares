import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PlanoEntidade } from "../entity/PlanoEntidade"
import { cadastraPlano } from "../../../application/use_case/CadastraPlano"
import { RepositorioPlanosReq } from "../repository/RepositorioPlanoReq"
import { EditaPlano } from "../../../application/use_case/EditaPlano"
import { ListaPlano } from "../../../application/use_case/ListaPlano"
import { PlanoEntityMapper } from "../../../adapters/mappers/PlanoEntityMapper"
import { RepositorioPlano } from "../../../adapters/gateways/RepositorioPlano"

@Module({
    imports:[TypeOrmModule.forFeature([PlanoEntidade])],
    providers:[
        PlanoEntityMapper,
        RepositorioPlanosReq,
        {
            provide: RepositorioPlano,
            useFactory:(repositorioReq: RepositorioPlanosReq, mapper: PlanoEntityMapper) => {
                return new RepositorioPlano(repositorioReq, mapper)
            },
            inject:[RepositorioPlanosReq, PlanoEntityMapper]
        },
        {
            provide: cadastraPlano,
            useFactory:(repo: RepositorioPlano) => {
                return new cadastraPlano(repo)
            },
            inject:[RepositorioPlano]
        },
        {
            provide: 'ILISTA_PLANO',
            useFactory:(repo: RepositorioPlano) => {
                return new ListaPlano(repo)
            },
            inject:[RepositorioPlano]
        },
        {
            provide: 'IEDITA_PLANO',
            useFactory: (repo: RepositorioPlano) =>{
                return new EditaPlano(repo)
            },
            inject:[RepositorioPlano]
        }
    ],
    exports:[cadastraPlano, 'ILISTA_PLANO', 'IEDITA_PLANO', RepositorioPlano]
})

export class PlanoModule {}