import { PlanoDomain } from "../../domain/PlanoDomain";
import { ICadastraPlano } from "../ports/input/ICadastraPlano";
import { IRepositorioPlanos } from "../ports/output/IRepositorioPlano";

export class cadastraPlano implements ICadastraPlano{
    private cadastra: IRepositorioPlanos

    constructor(cadastra: IRepositorioPlanos){
        this.cadastra = cadastra
    }
    
    cadastraPlano(plano: PlanoDomain){
        this.cadastra.cadastraPlano(plano);
    }
}