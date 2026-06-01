import { AssinaturaDomain } from "../../../domain/AssinaturaDomain"


export interface IRepositorioAssinatura{

    listaAssinatura(id: number): Promise<AssinaturaDomain>

    cadastrarAssinatura(assinatura: AssinaturaDomain): Promise <AssinaturaDomain>

    listaAssinaturas(): Promise<AssinaturaDomain[]>

    listaAssinaturasDeCliente(id: number): Promise<AssinaturaDomain[]>

    listaAssinaturaPorPlano(id:number): Promise<AssinaturaDomain[]>

    atualizaDataPagamento(id: number, dataUltimoPagamento: Date): void;
}