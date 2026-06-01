import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PagamentoEntidade } from "../entity/PagamentoEntidade";
import { Repository } from "typeorm";

@Injectable()
export class RepositorioPagamentoReq{

    constructor(@InjectRepository(PagamentoEntidade) private repositorio: Repository<PagamentoEntidade>){

    }

    realizaPagamento(pagamento: PagamentoEntidade){
       const entidade = this.repositorio.save(pagamento)

       return entidade;
    }

    

}