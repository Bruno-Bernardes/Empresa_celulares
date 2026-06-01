import { Inject } from "@nestjs/common";
import { PagamentoDomain } from "../../domain/PagamentoDomain";
import { ICadastraPagamento } from "../ports/input/ICadastraPagamento";
import type { IRepositorioPagamento } from "../ports/output/IRepositorioPagamento";
import { ClientProxy } from "@nestjs/microservices";



export class CadastraPagamento implements ICadastraPagamento{
    
    constructor(private repositorioPag: IRepositorioPagamento, @Inject('FATURAMENTO_SERVICE') private broker: ClientProxy){

    }

    async realizaPagamento(pagamento: PagamentoDomain):Promise<PagamentoDomain>{
        
        this.broker.emit('pagamento_ativo',{codigoAssinatura: pagamento.getCodigoAssinatura, dataPagamento: pagamento.getDataPagamento })
        
        const entidade = await this.repositorioPag.realizaPagamento(pagamento)

        return entidade;
    }

}