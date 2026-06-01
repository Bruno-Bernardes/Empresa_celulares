import { PlanoDomain } from "../../domain/PlanoDomain"
import { PlanoEntidade } from "../../infra/persistence/entity/PlanoEntidade"

export class PlanoEntityMapper{

    toEntidade(plano: PlanoDomain){
        return new PlanoEntidade(plano.getNome, plano.getCustoMensal, plano.getDescricao)
    }

    toDominio(plano: PlanoEntidade){
        return new PlanoDomain(plano.getNome, plano.getCustoMensal, plano.getDescricao)
    }
}