import { PlanoDomain } from "../../../domain/PlanoDomain";

export interface IRepositorioPlanos{
    
    cadastraPlano(plano: PlanoDomain): void;
    
    listarPlanos(): Promise <PlanoDomain[]>;
    
    listarPlano(id: number): Promise<PlanoDomain>
    
    editaNomePlano(plano: PlanoDomain): PlanoDomain
    
    editaCustoMensalPlano(id:number, custoMensal: number): Promise <PlanoDomain>
    
    editaDataModificacaoPlano(plano: PlanoDomain): PlanoDomain

    editaDescricaoPlano(plano: PlanoDomain): PlanoDomain
}