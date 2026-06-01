import { ClienteDomain } from "../../domain/ClienteDomain"
import { IEditaCliente } from "../ports/input/IEditaCliente"
import { IRepositorioCliente } from "../ports/output/IRepositorioCliente"

export  class EditarCliente implements IEditaCliente{
    private repositorio: IRepositorioCliente

    constructor(repositorio: IRepositorioCliente){
        this.repositorio = repositorio
    }

    editaNomeCliente(cliente: ClienteDomain){
        this.repositorio.editaNomeCliente(cliente)
    }
    editaEmailCliente(cliente: ClienteDomain){
        this.repositorio.editaEmailCliente(cliente)
    }
    
}