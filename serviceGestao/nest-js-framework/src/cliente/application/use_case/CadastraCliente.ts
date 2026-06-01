import { ClienteDomain } from "../../domain/ClienteDomain";
import { ICadastraCliente } from "../ports/input/ICadastraCliente";
import { IRepositorioCliente } from "../ports/output/IRepositorioCliente";

export class CadastraCliente implements ICadastraCliente{
    private repositorio: IRepositorioCliente

    constructor(repositorio: IRepositorioCliente){
        this.repositorio = repositorio;
    }

    public cadastraNovoCliente(nome: string, emaiil: string):Promise <ClienteDomain>{
       
        return this.repositorio.cadastraCliente(nome, emaiil);

    }

}