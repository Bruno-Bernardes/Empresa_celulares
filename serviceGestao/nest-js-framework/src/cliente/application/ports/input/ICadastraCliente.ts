import { ClienteDomain } from "../../../domain/ClienteDomain";

export interface ICadastraCliente{
    cadastraNovoCliente(nome: string, emaiil: string):Promise <ClienteDomain>
}