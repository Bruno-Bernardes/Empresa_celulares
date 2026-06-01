import { IRepositorioPagamento } from "../../application/ports/output/IRepositorioPagamento";
import { PagamentoDomain } from "../../domain/PagamentoDomain";
import { RepositorioPagamentoReq } from "../../infra/persistence/repository/RepositorioPagamentoReq";
import { PagamentoEntityMapper } from "../mappers/PagamentoEntityMapper";

export class RepositorioPagamento implements IRepositorioPagamento{

    constructor(private repoPag: RepositorioPagamentoReq, private mapper: PagamentoEntityMapper){

    }

    async realizaPagamento(pagamento: PagamentoDomain): Promise<PagamentoDomain> {

        const  entidade = this.mapper.toDomainEntidade(pagamento)

        const entidade2 =  await this.repoPag.realizaPagamento(entidade);

        return this.mapper.toEntidadeDomain(entidade2)
    }

}