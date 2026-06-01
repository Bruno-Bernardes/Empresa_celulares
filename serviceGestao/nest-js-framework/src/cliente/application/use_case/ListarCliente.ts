import { ClienteDomain } from "../../domain/ClienteDomain"
import { IListaCliente } from "../ports/input/IListaCliente"
import { IRepositorioCliente } from "../ports/output/IRepositorioCliente"

export class ListarCliente implements IListaCliente{
    private repositorio: IRepositorioCliente

    constructor(repositorio: IRepositorioCliente){
        this.repositorio = repositorio
    }

    public listarUmCliente(id: number): Promise<ClienteDomain>{
        
        return this.repositorio.listarCliente(id)
    }

    public listarTodosOsClientes(): Promise<ClienteDomain[]>{
        return this.repositorio.listarClientes()
    }

}