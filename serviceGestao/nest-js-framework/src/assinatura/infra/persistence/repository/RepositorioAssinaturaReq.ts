import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssinaturaEntidade } from "../entity/AssinaturaEntidade";
import { Repository } from "typeorm";

@Injectable()
export class RepositorioAssinaturaReq{

    constructor(@InjectRepository(AssinaturaEntidade) private assinaturaRepositorio: Repository<AssinaturaEntidade>){

    }

    async listaAssinatura(id: number): Promise<AssinaturaEntidade | null>{
        return await this.assinaturaRepositorio.findOne({
            where:{codigo: id}
        })
    }

    async atualizaDataPagamento(id: number, dataUltimoPagamento: Date){
        this.assinaturaRepositorio.update(id,{dataUltimoPagamento: dataUltimoPagamento})
    }

    async cadastraAssinatura(assinatura: AssinaturaEntidade):Promise <AssinaturaEntidade>{
        
        return await this.assinaturaRepositorio.save(assinatura);
    }

    async listarAssinaturas(): Promise<AssinaturaEntidade[]>{
        return await this.assinaturaRepositorio.find()
    }

    async listarAssinaturasDoCliente(id: number): Promise<AssinaturaEntidade[]>{
     
        return await this.assinaturaRepositorio.find({
            where: {codigoCliente: id}
        })
    }

    async listarPlanosPorAssinatura(id:number): Promise<AssinaturaEntidade[]>{
        return await this.assinaturaRepositorio.find({
            where:{codigoPlano: id}
        })
    }
}