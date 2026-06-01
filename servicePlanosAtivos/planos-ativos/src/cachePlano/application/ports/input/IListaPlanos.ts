import { CachePlanosDomain } from "../../../Domain/CachePlanosDomain";

export interface IListaPlanos{

    listaPlanoAtivo(id: number):Promise<CachePlanosDomain>
  
}