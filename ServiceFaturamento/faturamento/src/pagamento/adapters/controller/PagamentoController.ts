import { Body, Controller, Inject, Injectable, Post } from "@nestjs/common";
import { CadastraPagamentoDto } from "../mappers/CadastraPagamentoDto";
import type { ICadastraPagamento } from "../../application/ports/input/ICadastraPagamento";
import { PagamentoDomain } from "../../domain/PagamentoDomain";
import { PagamentoEntityMapper } from "../mappers/PagamentoEntityMapper";

@Controller('registrarPagamento')
export class PagamentoController{

    constructor(@Inject('ICADASTRA_PAGAMENTO') private cadastro: ICadastraPagamento, private mapper: PagamentoEntityMapper){

    }

    @Post()
    async cadastraPagamento(@Body() dto:CadastraPagamentoDto){
     
        const dto2 = await this.cadastro.realizaPagamento(this.mapper.toDtoDomain(dto));
        
        return this.mapper.toDomainDto(dto2)
    }
}