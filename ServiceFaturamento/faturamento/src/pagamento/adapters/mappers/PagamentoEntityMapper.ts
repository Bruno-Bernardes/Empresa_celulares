import { PagamentoDomain } from "../../domain/PagamentoDomain"
import { PagamentoEntidade } from "../../infra/persistence/entity/PagamentoEntidade"
import { CadastraPagamentoDto } from "./CadastraPagamentoDto";

export class PagamentoEntityMapper{


    toDomainEntidade(pagamento: PagamentoDomain): PagamentoEntidade{
        return new PagamentoEntidade(pagamento.getCodigoAssinatura, pagamento.getValorPago, pagamento.getDataPagamento)
    }

    toEntidadeDomain(pagamento: PagamentoEntidade): PagamentoDomain{
        return new PagamentoDomain(pagamento.getCodigoAssinatura, pagamento.getValorPago, pagamento.getDataPagamento)
    }

    toDomainDto(pagamento: PagamentoDomain){
        return new CadastraPagamentoDto(pagamento.getDataPagamento.getDate(), pagamento.getDataPagamento.getMonth(), pagamento.getDataPagamento.getFullYear()
    ,pagamento.getCodigoAssinatura, pagamento.getValorPago);

    }

    toDtoDomain(pagamento: CadastraPagamentoDto){

        return new PagamentoDomain(pagamento.codAss, pagamento.valorPago, new Date(pagamento.ano, pagamento.mes - 1, pagamento.dia))
    }

}