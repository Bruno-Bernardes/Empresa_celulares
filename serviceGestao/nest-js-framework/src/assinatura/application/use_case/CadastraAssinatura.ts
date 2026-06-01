import { IRepositorioCliente } from "../../../cliente/application/ports/output/IRepositorioCliente"
import { IRepositorioPlanos } from "../../../plano/application/ports/output/IRepositorioPlano"
import { AssinaturaDomain } from "../../domain/AssinaturaDomain"
import { ICadastraAssinatura } from "../ports/input/ICadastraAssinatura"
import { IRepositorioAssinatura } from "../ports/output/IRepositorioAssinatura"

export class CadastraAssinatura implements ICadastraAssinatura{
    private repositorioAss: IRepositorioAssinatura
    private repositorioClin: IRepositorioCliente
    private repositorioPlan: IRepositorioPlanos

    constructor(repositorioAss: IRepositorioAssinatura, repositorioClin: IRepositorioCliente, repositorioPlan: IRepositorioPlanos ){
        this.repositorioAss = repositorioAss
        this.repositorioClin = repositorioClin
        this.repositorioPlan = repositorioPlan

    }

    async cadastraAssinatura(assinatura: AssinaturaDomain):Promise<AssinaturaDomain>{
        await this.repositorioClin.listarCliente(assinatura.getCodigoCliente)

        await this.repositorioPlan.listarPlano(assinatura.getCodigoPlano)
     
        return this.repositorioAss.cadastrarAssinatura(assinatura)
    }

    
}