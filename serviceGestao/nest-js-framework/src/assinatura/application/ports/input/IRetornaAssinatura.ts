import { AssinaturaDomain } from "../../../domain/AssinaturaDomain";

export interface IRetornaAssinatura{
    
    retornaAssinaturaPlano(idPlano:number): void;

    retornaAssinaturaPorCliente(idCliente: number): Promise<AssinaturaDomain[]>;

    retornaAssinaturaPorTipo(tipo: string): void;

    formataDataEseparaAtivoCancelado(assinatura: AssinaturaDomain[]): AssinaturaDomain[];

    retornaAssinatura(id: number): Promise<AssinaturaDomain>
}