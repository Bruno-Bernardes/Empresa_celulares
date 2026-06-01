import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { PagamentoDto } from "./mapper/PagamentoDto";
import { lastValueFrom } from "rxjs";

@Controller()
export class AppController{
    
    constructor(@Inject('ASSINATURA_SERVICE') private plano: ClientProxy, @Inject('PLANO_SERVICE') private planoAtivo: ClientProxy){

    }
    //aqui ele recebe o pedido do microservice planos, para pedir os planos ativos de uma certa assinatura
    @MessagePattern('plano_status')
    async recebeReqPlano(@Payload() id: number){
        
        const resposta = await lastValueFrom(this.plano.send('plano_gestao', id))
        
        return resposta
    }

    @EventPattern('pagamento_ativo')
    recebeReqPagamento(@Payload() pagamento:PagamentoDto){
        
        this.plano.emit('pagamento_feito', pagamento)
        
        this.planoAtivo.emit('apagar_assinatura', pagamento.codigoAssinatura)
    
        
    }

    




}