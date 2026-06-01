import { stat } from "fs";
import { IListaPlanos } from "../../application/ports/input/IListaPlanos";
import { IRepositorioPlanos } from "../../application/ports/output/IRepositorioPlano";
import { RepositorioPlanosReq } from "../../infra/persistence/repository/RepositorioPlanosReq";
import { CacheEntityDomainMapper } from "../mapper/CacheEntityDomainMapper";
import { CachePlanosDomain } from "../../Domain/CachePlanosDomain";

export class RepositorioPlanos implements IRepositorioPlanos{

    constructor(private repo: RepositorioPlanosReq, private mapper: CacheEntityDomainMapper){

    }

    deletaPlano(id: number): void {
        this.repo.deletaPlano(id)
    }

    async listaPlanoStatus(id: number):Promise<CachePlanosDomain | null>{
        const domain2 = await this.repo.retornaPlanoStatus(id)

        if(domain2 == null){
            return null;
        }
        return this.mapper.toEntidadeDomain(domain2);
    }

    async cadastraStatusPlano(codAssinatura: number, status: boolean): Promise<CachePlanosDomain> {
        const domain = await this.repo.cadastraPlaoStatus(codAssinatura, status)
        
        return this.mapper.toEntidadeDomain(domain)
    }

    atualizaStatusPlano(codAssinatura: number, status: boolean): void {
        this.repo.atualizaPlanoStatus(codAssinatura, status)
    }

}