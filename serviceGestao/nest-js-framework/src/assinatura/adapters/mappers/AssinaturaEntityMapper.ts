import { AssinaturaDomain } from "../../domain/AssinaturaDomain"
import { AssinaturaEntidade } from "../../infra/persistence/entity/AssinaturaEntidade"

export class AssinaturaEntityMapper{

    toEntidade(assinatura: AssinaturaDomain): AssinaturaEntidade{
        return new AssinaturaEntidade(assinatura.getCodigoPlano, assinatura.getCodigoCliente, assinatura.getCustoFinal, assinatura.getDescricao)
    }

    toDominio(assinatura: AssinaturaEntidade): AssinaturaDomain{
        return new AssinaturaDomain(assinatura.getCodigoPlano, assinatura.getCodigoCliente, assinatura.getCustoFinal, assinatura.getDescricao)
    }
}