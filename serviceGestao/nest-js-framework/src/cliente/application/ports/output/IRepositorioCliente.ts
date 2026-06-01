import { ClienteDomain } from "../../../domain/ClienteDomain";


export interface IRepositorioCliente{
    
    cadastraCliente(nome: string, emaiil: string): Promise<ClienteDomain>;

    listarClientes(): Promise<ClienteDomain[]>

    listarCliente(id: number):Promise<ClienteDomain>

    editaNomeCliente(cliente: ClienteDomain): ClienteDomain

    editaEmailCliente(cliente: ClienteDomain): ClienteDomain



}