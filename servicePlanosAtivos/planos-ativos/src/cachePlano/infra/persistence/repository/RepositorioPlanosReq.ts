import { Injectable } from "@nestjs/common"

import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CachePlanoEntidade } from "../entity/CachePlanosEntity"

@Injectable()
export class RepositorioPlanosReq{

    constructor(@InjectRepository(CachePlanoEntidade) private planoRepositorio: Repository<CachePlanoEntidade>){

    }


    deletaPlano(id: number){
        this.planoRepositorio.delete( { codigoAss: id } )
    }
    async retornaPlanoStatus(id: number): Promise<CachePlanoEntidade | null>{
       
        return await this.planoRepositorio.findOne({where:{codigoAss: id}})
    }
  

    cadastraPlaoStatus(idAssinatura: number, status:boolean): Promise<CachePlanoEntidade>{
        let plano = new CachePlanoEntidade(status)

        plano.setCodigoAss(idAssinatura)

        return this.planoRepositorio.save(plano)
    }

    atualizaPlanoStatus(idAssinatura: number, status:boolean){

    }

}