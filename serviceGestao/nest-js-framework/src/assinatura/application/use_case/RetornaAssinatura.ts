import { AssinaturaDomain } from "../../domain/AssinaturaDomain"
import { IRetornaAssinatura } from "../ports/input/IRetornaAssinatura"
import { IRepositorioAssinatura } from "../ports/output/IRepositorioAssinatura"

export class RetornaAssinatura implements  IRetornaAssinatura{
    private repositorioAss: IRepositorioAssinatura
    

    constructor(repositorioAss: IRepositorioAssinatura){
        this.repositorioAss = repositorioAss
    }
     
    async retornaAssinatura(id: number): Promise<AssinaturaDomain> {
        const assinatura = await this.repositorioAss.listaAssinatura(id)
       
        return this.formataDataEseparaAtivoCanceladoUnico(assinatura)
        
    }
    
    async retornaAssinaturaPlano(idPlano:number){
        const assinaturaClin = this.formataDataEseparaAtivoCancelado(await this.repositorioAss.listaAssinaturaPorPlano(idPlano))

        return assinaturaClin
    }

    async retornaAssinaturaPorCliente(idCliente: number):Promise<AssinaturaDomain[]>{
        
        const assinaturaClin = this.formataDataEseparaAtivoCancelado(await this.repositorioAss.listaAssinaturasDeCliente(idCliente))
       
        return assinaturaClin
    }

    async retornaAssinaturaPorTipo(tipo: string){//aqui verifica o que foi pedido, se foi para ver todos, ativos ou cancelados.
        const novasAssinaturas: AssinaturaDomain[] = []
        const assinatura = await this.repositorioAss.listaAssinaturas();
    
        if(tipo === "TODOS"){
            return this.formataDataEseparaAtivoCancelado(assinatura)
        }else if(tipo === "ATIVOS"){
            const assinaturaAtivos = this.formataDataEseparaAtivoCancelado(assinatura)
            
            for(const ass of assinaturaAtivos){
                if(ass.getStatus === "ATIVO"){
                    novasAssinaturas.push(ass)
                }    
            }

            return novasAssinaturas

        }else if(tipo === "CANCELADOS"){
            const assinaturaCancelado = this.formataDataEseparaAtivoCancelado(assinatura)
                        
            for(const ass of assinaturaCancelado){
                if(ass.getStatus === "CANCELADO"){
                    novasAssinaturas.push(ass)
                }    
            }

            return novasAssinaturas
           
        }else{
            throw new Error("CODIGO INVALIDO")
        }
    }


    formataDataEseparaAtivoCancelado(assinatura: AssinaturaDomain[]): AssinaturaDomain[]{//aqui verifica varias assinaturas
        let dataDeHoje = this.hoje()//aqui ele pega a data de hoje
       
        if(assinatura.length > 1){
            for(const ass of assinatura){
                this.verificaAtivoOuCancelado(ass, dataDeHoje)
            } 
        }

        return assinatura;
    }

    formataDataEseparaAtivoCanceladoUnico(assinatura: AssinaturaDomain):AssinaturaDomain{//aqui diz se é ativo ou não, porem verifica 1 assinatura só
         let dataDeHoje = this.hoje()//aqui ele pega a data de hoje
        
         return this.verificaAtivoOuCancelado(assinatura, dataDeHoje)
    }

    verificaAtivoOuCancelado(ass: AssinaturaDomain, dataDeHoje: Date){
            let dataCerta: boolean = true;
            let dataInicio = this.toBrasilia(ass.getInicioFidelidade);//pega a data que o usuario cadastrou o plano
            let dataFim = this.toBrasilia(ass.getInicioFidelidade);//pega a data que o usuario cadastrou o plano tambem

            dataFim.setDate(dataFim.getDate() + 30);//pega a data que o usuario cadastrou o plano e adiciona 30 dias
            
            /*
                nesse codigo é pego a data que foi cadastrado a assinatura, digamos 01/01/2026, adiciona mais 30 dias nessa data 
                e pega a data de hoje, entao se a data de hoje estiver entre a data de cadastro e a data de fim que são 30 dias adicionados,
                o codigo verifica se a data do ultimo pagamento é igual a data do cadastro, caso o mes de hoje seja diferente da do cadastro,
                então é adicionado 30 dias até que a data de inicio e fim fiquem entre a data de hoje, assim pega o ultimo pagamento e verifica 
                se é igual a data inicial.

                como a ideia é esse codigo ativar a cada 1 dia, ele vai verificar todo  dia se a assinatura está ativa, por hora ele só guarda 1 data 
                de ultimo pagamento, mas o idel seria sempre que o pagamento for feito, ter uma tabela com o mes que foi pago e dar um true nela, assim sabemos
                se o mes de março digammos foi pago
            */ 
                do{ 
                  

                    if(dataInicio.getTime() <= dataDeHoje.getTime() && dataDeHoje.getTime() < dataFim.getTime()){
                        dataCerta = false;

                        

                            if(dataInicio.getTime() === ass.getDataUltimoPagamento?.getTime()){
                                ass.setStatus = "ATIVO"
                            }else{
                                ass.setStatus = "CANCELADO"
                            }
                        


                    }else{
                        dataInicio.setUTCDate(dataInicio.getUTCDate() + 30)
                        dataFim.setUTCDate(dataFim.getUTCDate() + 30)
                         
                    }
               } while(dataCerta);
            return ass
    }


    hoje(): Date {
        return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))
    }
    
    toBrasilia(data: Date): Date {
        return new Date(data.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))
    }
    formataData(data: Date): string {
        return data.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    }
    
}