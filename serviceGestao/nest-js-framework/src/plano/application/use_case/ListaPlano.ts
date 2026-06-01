import { PlanoDomain } from "../../domain/PlanoDomain";
import { IListaPlano } from "../ports/input/IListaPlano";
import { IRepositorioPlanos } from "../ports/output/IRepositorioPlano";

export class ListaPlano implements IListaPlano{
    private repositorio: IRepositorioPlanos

    constructor(repositorio: IRepositorioPlanos){
        this.repositorio = repositorio;
    }
    
    listaPlano(id: number){
        return this.repositorio.listarPlano(id);
    }

    public async listarPlanos(): Promise<PlanoDomain[]>{
        return await this.repositorio.listarPlanos()
    }
   
}