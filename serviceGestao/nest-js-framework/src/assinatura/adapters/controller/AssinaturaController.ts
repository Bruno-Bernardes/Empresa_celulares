import { Controller, Inject } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import type { IEditaAssinatura } from "../../application/ports/input/IEditaAssinatura";
import type { IRetornaAssinatura } from "../../application/ports/input/IRetornaAssinatura";


@Controller()
export class AssinaturaController{

    constructor(@Inject('IEDITA_ASSINATURA') private edita: IEditaAssinatura, @Inject('IRETORNA_ASSINATURA') private retorna: IRetornaAssinatura){

    }

    @MessagePattern('plano_gestao')
    async devolveStatusAssinatura(@Payload() idAss: number){
        
        const plano = await this.retorna.retornaAssinatura(idAss)
        
       
        if(plano.getStatus == "ATIVO"){
            return {codAss: plano.getCodigo, status: true}
        }else{
            return {codAss: plano.getCodigo, status: false}
        }
    }

    @EventPattern('pagamento_feito')
    pagamentoAtivo(@Payload() data: any){
        
        const {codigoAssinatura, dataPagamento} = data;
       
        this.edita.atualizaDataPagamento(codigoAssinatura, dataPagamento)
    }
}