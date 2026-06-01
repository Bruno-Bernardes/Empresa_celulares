import { CachePlanosDomain } from "../../../Domain/CachePlanosDomain"

export interface IRepositorioPlanos{

    listaPlanoStatus(id: number): Promise<CachePlanosDomain | null>

    cadastraStatusPlano(codAssinatura: number, status: boolean): Promise<CachePlanosDomain>

    atualizaStatusPlano(codAssinatura: number, status: boolean): void

    deletaPlano(id:number): void
}