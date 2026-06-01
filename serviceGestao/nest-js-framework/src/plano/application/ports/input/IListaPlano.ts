import { PlanoDomain } from "../../../domain/PlanoDomain";

export interface IListaPlano{

     listaPlano(id: number): void;

     listarPlanos(): Promise<PlanoDomain[]>
}