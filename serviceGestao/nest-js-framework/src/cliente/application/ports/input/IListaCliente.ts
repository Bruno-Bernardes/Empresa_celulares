import { ClienteDomain } from "../../../domain/ClienteDomain";

export interface IListaCliente{
    
    listarUmCliente(id: number): Promise<ClienteDomain>

    listarTodosOsClientes(): Promise<ClienteDomain[]>
}