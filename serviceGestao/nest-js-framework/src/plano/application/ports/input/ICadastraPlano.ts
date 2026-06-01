import { PlanoDomain } from "../../../domain/PlanoDomain";

export interface ICadastraPlano{
    cadastraPlano(plano: PlanoDomain): void;
}