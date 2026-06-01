import { PagamentoDomain } from "../../../domain/PagamentoDomain";

export interface ICadastraPagamento{

    realizaPagamento(pagamento: PagamentoDomain): Promise<PagamentoDomain>;

}