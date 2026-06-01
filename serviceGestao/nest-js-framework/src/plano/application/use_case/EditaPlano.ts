import { PlanoDomain } from "../../domain/PlanoDomain"
import { IEditaPlano } from "../ports/input/IEditaPlano"
import { IRepositorioPlanos } from "../ports/output/IRepositorioPlano"

export class EditaPlano implements IEditaPlano{
    private editaPlano: IRepositorioPlanos

    constructor(editaPlano: IRepositorioPlanos){
        this.editaPlano = editaPlano
    }

    editaNomePlano(plano: PlanoDomain){
        this.editaPlano.editaNomePlano(plano)
    }

    editaCustoMensalPlano(id: number, custoMensal: number){
       return this.editaPlano.editaCustoMensalPlano(id, custoMensal)
    }

    editaDataModificacaoPlano(plano: PlanoDomain){
        this.editaPlano.editaDataModificacaoPlano(plano)
    }

    editaDescricaoPlano(plano: PlanoDomain){
        this.editaPlano.editaDescricaoPlano(plano)
    }
}