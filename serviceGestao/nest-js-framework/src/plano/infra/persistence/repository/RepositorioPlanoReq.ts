import { Injectable } from "@nestjs/common"
import { PlanoEntidade } from "../entity/PlanoEntidade"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Injectable()
export class RepositorioPlanosReq{
    constructor(@InjectRepository(PlanoEntidade) private planoRepositorio: Repository<PlanoEntidade>){

    }

    cadastrarPlano(plano: PlanoEntidade){
        this.planoRepositorio.save(plano)
    }

    async listarPlanos(){
        return await this.planoRepositorio.find()
    }
    
    async listarPlano(id: number): Promise<PlanoEntidade | null>{
        return await this.planoRepositorio.findOne({
            where:{codigo: id}
        })
    }

    async editaCustoMensalPlano(id: number, custoMensal: number): Promise<PlanoEntidade | null>{
        this.planoRepositorio.update(id,{custoMensal: custoMensal})

        return await this.listarPlano(id) 
    }

}