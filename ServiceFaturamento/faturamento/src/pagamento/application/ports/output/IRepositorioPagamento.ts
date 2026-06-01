import { PagamentoDomain } from "../../../domain/PagamentoDomain";

export interface IRepositorioPagamento{
    realizaPagamento(pagamento: PagamentoDomain): Promise <PagamentoDomain>
}