import { CachePlanosDomain } from "../../Domain/CachePlanosDomain";
import { CachePlanoEntidade } from "../../infra/persistence/entity/CachePlanosEntity";

export class CacheEntityDomainMapper{

    toDomainEntidade(domain: CachePlanosDomain){
        return new CachePlanoEntidade(domain.getStatus)
    }

    toEntidadeDomain(entity: CachePlanoEntidade){
        return new CachePlanosDomain(entity.codigoAss ,entity.getStatus);
    }

   

    
}