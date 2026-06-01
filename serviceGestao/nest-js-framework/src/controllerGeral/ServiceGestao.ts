import { Body, ConflictException, Controller, Get, Inject, NotFoundException, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ClienteCadastroDto } from "../cliente/adapters/mappers/ClienteCadastroDto";
import { AssinaturaCadastroDto } from "../assinatura/adapters/mappers/AssinaturaCadastroDto";
import { AssinaturaDomain } from "../assinatura/domain/AssinaturaDomain";
import { AlteraInfPlanoDto } from "../plano/adapters/mappers/AlterarInfPlanoDto";
import { AssinaturaRetornaClienteDto } from "../assinatura/adapters/mappers/AssinaturaRetornaClienteDto";
import type { IListaCliente } from "../cliente/application/ports/input/IListaCliente";
import type { ICadastraCliente } from "../cliente/application/ports/input/ICadastraCliente";
import type { IEditaCliente } from "../cliente/application/ports/input/IEditaCliente";
import type { IListaPlano } from "../plano/application/ports/input/IListaPlano";
import type { ICadastraAssinatura } from "../assinatura/application/ports/input/ICadastraAssinatura";
import type { IRetornaAssinatura } from "../assinatura/application/ports/input/IRetornaAssinatura";
import type { IEditaPlano } from "../plano/application/ports/input/IEditaPlano";


@Controller('gestao')
export class ServicoGestao{
    
    constructor( @Inject('ILISTA_CLIENTE') private listar: IListaCliente, 
                 @Inject('ICADASTRA_CLIENTE')private cadastrar: ICadastraCliente, 
                 @Inject('IEDITA_CLIENTE') private editar: IEditaCliente, 
                 @Inject('ILISTA_PLANO') private listarPlan: IListaPlano, 
                 @Inject('IEDITA_PLANO') private editaPlan: IEditaPlano,
                 @Inject('ICADASTRA_ASSINATURA') private cadastraAss: ICadastraAssinatura, 
                 @Inject('IRETORNA_ASSINATURA') private listarAss: IRetornaAssinatura){
    }

    @Post('cadastro')
    async cadastraCliente(@Body() dto: ClienteCadastroDto){

        try{
            const dtoRetorno = await this.cadastrar.cadastraNovoCliente(dto.nome, dto.email)

            return dtoRetorno
        }catch(err){            
            if(err instanceof Error && err.message === "Email Já existe"){
                throw new ConflictException("O email cadastrado já existe")
            }
        }        
    }


    @Get('clientes')
    listarClientes(){
        return this.listar.listarTodosOsClientes();
    }

     
    @Get('cliente/:id')
    async listarCliente(@Param('id', ParseIntPipe) id: number){

        try{
             const cliente = await this.listar.listarUmCliente(id)
             return cliente
        }catch(err){
            if(err instanceof Error && err.message === "CLIENTE_NULL"){
                throw new NotFoundException("Cliente nao encontrado")
            }
        }       
    }

    @Get('planos')
    listarPlanos(){
        return this.listarPlan.listarPlanos()       
    }

    @Get('plano/:id')
    async listarPlano(@Param('id', ParseIntPipe) id: number){

        try{
            return await this.listarPlan.listaPlano(id)

        }catch(err){
            if(err instanceof Error && err.message === "ID PLANO NAO EXISTE"){
                throw new NotFoundException("Plano não existe")
            }
        }
        
    }

    @Post('assinaturas')
    async cadastraAssinatura(@Body() dto: AssinaturaCadastroDto){
        
        try{
            const ass = await this.cadastraAss.cadastraAssinatura(new AssinaturaDomain(dto.codPlano, dto.codCli, dto.custoFinal, dto.descricao))
            
            return new AssinaturaCadastroDto(ass.getCodigoCliente, ass.getCodigoPlano, ass.getCustoFinal, ass.getDescricao)

        }catch(err){
            
            if(err instanceof Error && err.message === "CLIENTE_NULL"){
                throw new NotFoundException("Cliente não encontrado")
            }else if(err instanceof Error && err.message === "ID PLANO NAO EXISTE"){
                throw new NotFoundException("ID plano não")
            }
        }
    } 

    @Patch('planos/:id')
    async alteraCustoMensal(@Param('id', ParseIntPipe) id: number, @Body() dto: AlteraInfPlanoDto){
    
       try{
            const plano =  await this.editaPlan.editaCustoMensalPlano(id, dto.custoMensal)  

            return plano
       }catch(err){
            if(err instanceof Error && err.message ==="ID PLANO NAO EXISTE"){
                throw new NotFoundException("ID plano não existe")
            }
       }
    }


    @Get('assinaturas/:tipo')
    async retornaTipoAssinatura(@Param("tipo") tipo: string){
        try{
            return await this.listarAss.retornaAssinaturaPorTipo(tipo)
        }catch(err){
            if(err instanceof Error && err.message === "CODIGO INVALIDO"){
                throw new NotFoundException("CODIGO INVALIDO")
            }
        }
    }

    @Get('asscli/:codcli')
    async retornaAssinaturaCliente(@Param('codcli') codcli: number){
       
        const ass = await this.listarAss.retornaAssinaturaPorCliente(codcli)
    
        const dto: AssinaturaRetornaClienteDto[] = ass.map(u => ({codigoAssinatura: u.getCodigo, codigoCliente: u.getCodigoCliente, codigoPlano: u.getCodigoPlano, DateInicio: u.getInicioFidelidade, dataFim: u.getFimFidelidade, status: u.getStatus}))
        
        return dto
    }

    @Get('assinaturaplano/:codplano')
    retornaAssinaturasPlanos(@Param('codplano') codplano: number){
        return this.listarAss.retornaAssinaturaPlano(codplano)
    }
} 