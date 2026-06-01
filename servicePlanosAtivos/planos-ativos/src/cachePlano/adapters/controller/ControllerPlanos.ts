import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import type { IListaPlanos } from "../../application/ports/input/IListaPlanos";
import {EventPattern, Payload } from "@nestjs/microservices";
import type { IDeletaPlano } from "../../application/ports/input/IDeletaPlano";


@Controller()
export class ControllerPlanos{

    constructor(@Inject('IDELETA_PLANO') private deleta: IDeletaPlano,@Inject('ILISTA_PLANO') private lista: IListaPlanos){
        
    }

    @Get('planosativos/:id')
    async retornaPlanosAtivos(@Param('id', ParseIntPipe) id: number){
        
        return (await this.lista.listaPlanoAtivo(id)).getStatus;
    }
 
    @EventPattern('apagar_assinatura')
    apagarCacheAssinatura(@Payload() id: number){
        
        this.deleta.deletaPlano(id) 
        
    } 
}