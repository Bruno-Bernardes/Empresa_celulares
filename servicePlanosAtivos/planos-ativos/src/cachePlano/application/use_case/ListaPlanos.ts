import { Inject } from "@nestjs/common";
import { CachePlanosDomain } from "../../Domain/CachePlanosDomain";
import { IListaPlanos } from "../ports/input/IListaPlanos";
import type { IRepositorioPlanos } from "../ports/output/IRepositorioPlano";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";


export class ListaPlanos implements IListaPlanos{

    constructor(private repo: IRepositorioPlanos, @Inject('PLANOS_SERVICE') private broker: ClientProxy){

    }


    async listaPlanoAtivo(id: number): Promise<CachePlanosDomain> {
        let statusPlano = await this.repo.listaPlanoStatus(id)
        
        if(statusPlano == null){
           
            const {codAss, status}= await lastValueFrom(this.broker.send('plano_status', id))
            
            statusPlano = await this.repo.cadastraStatusPlano(codAss, status)

            return statusPlano

        }else{
            return statusPlano;
        }
    
    }

}