import { PlanoDomain } from "../../../domain/PlanoDomain";

export interface IEditaPlano{

        editaNomePlano(plano: PlanoDomain): void;
          
        
    
        editaCustoMensalPlano(id: number, custoMensal: number): void;
          
        
    
        editaDataModificacaoPlano(plano: PlanoDomain): void;
           
        
    
        editaDescricaoPlano(plano: PlanoDomain): void;
            
        
}