import { IRepositorioPlanos } from "../../application/ports/output/IRepositorioPlano";
import { PlanoDomain } from "../../domain/PlanoDomain";
import { PlanoEntidade } from "../../infra/persistence/entity/PlanoEntidade";
import { RepositorioPlanosReq } from "../../infra/persistence/repository/RepositorioPlanoReq";
import { PlanoEntityMapper } from "../mappers/PlanoEntityMapper";

export class RepositorioPlano implements IRepositorioPlanos{

    constructor(private repositorio: RepositorioPlanosReq, private mapper: PlanoEntityMapper){

    }

    cadastraPlano(plano: PlanoDomain): void {
        const entidade = this.mapper.toEntidade(plano)
        
        this.repositorio.cadastrarPlano(entidade)

        this.mapper.toDominio(entidade);
    }

    async listarPlanos(): Promise <PlanoDomain[]>{
        const lista = await this.repositorio.listarPlanos()
        const novaLista: PlanoDomain [] = []

        for(const p of lista){
            
            novaLista.push(this.mapper.toDominio(p))
            novaLista[novaLista.length - 1].setData = p.getData;
        }

        return novaLista


    }
    async listarPlano(id:number):Promise<PlanoDomain> {
        const planVerifica: PlanoEntidade | null= await this.repositorio.listarPlano(id)

        if(!planVerifica){
            throw new Error("ID PLANO NAO EXISTE")
        }

        return  this.mapper.toDominio(planVerifica)
    }

    editaNomePlano(plano: PlanoDomain): PlanoDomain {
        throw new Error("Method not implemented.");
    }


    async editaCustoMensalPlano(id:number, custoMensal: number): Promise <PlanoDomain> {
        let resultado = await this.repositorio.listarPlano(id)
        
        if(!resultado){
            throw new Error("ID PLANO NAO EXISTE")
        }
        
        resultado = await this.repositorio.editaCustoMensalPlano(id, custoMensal)
        
        return this.mapper.toDominio(resultado!)
    }

    editaDataModificacaoPlano(plano: PlanoDomain): PlanoDomain {
        throw new Error("Method not implemented.");
    }
    editaDescricaoPlano(plano: PlanoDomain): PlanoDomain {
        throw new Error("Method not implemented.");
    }
    
}