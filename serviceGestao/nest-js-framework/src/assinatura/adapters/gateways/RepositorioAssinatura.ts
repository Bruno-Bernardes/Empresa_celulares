import { NotFoundException } from "@nestjs/common"
import { IRepositorioAssinatura } from "../../application/ports/output/IRepositorioAssinatura"
import { AssinaturaDomain } from "../../domain/AssinaturaDomain"
import { RepositorioAssinaturaReq } from "../../infra/persistence/repository/RepositorioAssinaturaReq"
import { AssinaturaEntityMapper } from "../mappers/AssinaturaEntityMapper"

export class RepositorioAssinatura implements IRepositorioAssinatura{

    constructor(private repositorio: RepositorioAssinaturaReq, private mapper: AssinaturaEntityMapper){

    }


    async listaAssinatura(id: number): Promise<AssinaturaDomain> {

        const assinatura = await this.repositorio.listaAssinatura(id)
        
        if(assinatura == null){
            throw new NotFoundException('Assinatura não encontrada')
        }
       const assinatura2 =  this.mapper.toDominio(assinatura)
       assinatura2.setCodigo = assinatura.codigo
       assinatura2.setDataUltimoPagamento = assinatura.getDataUltimoPagamento;
       assinatura2.setInicioFidelidade = assinatura.getInicioFidelidade;
        
       return assinatura2
    }


    atualizaDataPagamento(id: number, dataUltimoPagamento: Date) {

        this.repositorio.atualizaDataPagamento(id,dataUltimoPagamento);
        
    }


    async listaAssinaturaPorPlano(id: number): Promise<AssinaturaDomain[]> {
        const novaLista: AssinaturaDomain[] = []
       
        for(const ass of await this.repositorio.listarPlanosPorAssinatura(id)){
            
            novaLista.push(this.mapper.toDominio(ass))
            novaLista[novaLista.length - 1].setCodigo = ass.getCodigo
            novaLista[novaLista.length - 1].setInicioFidelidade = ass.getInicioFidelidade
            novaLista[novaLista.length - 1].setFimFidelidade = ass.getFimFidelidade
            novaLista[novaLista.length - 1].setDataUltimoPagamento = ass.getDataUltimoPagamento
        }
        
        return novaLista
}

    async listaAssinaturasDeCliente(id: number): Promise<AssinaturaDomain[]> {
        const novaLista: AssinaturaDomain[] = []

        for(const ass of await this.repositorio.listarAssinaturasDoCliente(id)){
            
            novaLista.push(this.mapper.toDominio(ass))
            novaLista[novaLista.length - 1].setCodigo = ass.getCodigo
            novaLista[novaLista.length - 1].setInicioFidelidade = ass.getInicioFidelidade
            novaLista[novaLista.length - 1].setFimFidelidade = ass.getFimFidelidade
            novaLista[novaLista.length - 1].setDataUltimoPagamento = ass.getDataUltimoPagamento
        }
        
        return novaLista
    }

    async listaAssinaturas(): Promise<AssinaturaDomain[]> {
        const assinaturaConversao = await this.repositorio.listarAssinaturas()
       
        const novaLista: AssinaturaDomain[] = [] 
        
        for(const ass of assinaturaConversao){
            
            novaLista.push(this.mapper.toDominio(ass))    
            novaLista[novaLista.length - 1].setCodigo = ass.getCodigo
            novaLista[novaLista.length - 1].setInicioFidelidade = ass.getInicioFidelidade
            novaLista[novaLista.length - 1].setFimFidelidade = ass.getFimFidelidade
            novaLista[novaLista.length - 1].setDataUltimoPagamento = ass.getDataUltimoPagamento
        }

        return novaLista
    }

    

    async cadastrarAssinatura(assinatura: AssinaturaDomain):Promise <AssinaturaDomain> {
        
        const assinaturaEntidade = this.mapper.toEntidade(assinatura)

        const entidade = await this.repositorio.cadastraAssinatura(assinaturaEntidade)

        return this.mapper.toDominio(entidade)
    }
}