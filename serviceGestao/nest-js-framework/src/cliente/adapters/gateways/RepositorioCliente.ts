import { IRepositorioCliente } from "../../application/ports/output/IRepositorioCliente"
import { ClienteDomain } from "../../domain/ClienteDomain"
import { ClienteEntidade } from "../../infra/persistence/entity/ClienteEntidade"
import { RepositorioClienteReq } from "../../infra/persistence/repository/RepositorioClienteReq"
import { ClienteEntityMapper } from "../mappers/clienteEntityMapper"

export class RepositorioCliente implements IRepositorioCliente{

    private mapper: ClienteEntityMapper
    private repositorio: RepositorioClienteReq

    constructor(repositorio: RepositorioClienteReq,mapper: ClienteEntityMapper){
        this.mapper = mapper
        this.repositorio = repositorio
    }
    
    async cadastraCliente(nome: string, emaiil: string): Promise<ClienteDomain>{
        const verificaExistencia  = await this.repositorio.verificaSeClinteExiste(emaiil)

        if(verificaExistencia?.email){
            throw new Error("Email Já existe")
        }

        const entidade = this.mapper.toEntidade(new ClienteDomain(nome, emaiil))
        
        const dominio: ClienteEntidade = await this.repositorio.cadastraCliente(entidade)

        return this.mapper.toDominio(dominio)
    }

    async listarClientes(): Promise<ClienteDomain[]>{

        const cliente = this.repositorio.listarClientes()
        const novaLista: ClienteDomain[] = []

        
        for(const c of await cliente){
            novaLista.push(this.mapper.toDominio(c))
        }
       
        return novaLista

    }

    async listarCliente(id: number): Promise<ClienteDomain> {
        
        const constEnt: ClienteEntidade | null = await this.repositorio.listarCliente(id)
        
        if(!constEnt){
            throw new Error("CLIENTE_NULL")
        }
        
        return this.mapper.toDominio(constEnt)
        
    }

    editaEmailCliente(cliente: ClienteDomain): ClienteDomain {
        return new ClienteDomain("x","s")
    }

    editaNomeCliente(cliente: ClienteDomain): ClienteDomain{
        return new ClienteDomain("x","s")
    }

  
}