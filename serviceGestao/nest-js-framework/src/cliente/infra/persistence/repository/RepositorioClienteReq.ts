import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClienteEntidade } from "../entity/ClienteEntidade";
import { Repository } from "typeorm";

@Injectable()
export class RepositorioClienteReq{
    
    constructor(@InjectRepository(ClienteEntidade) private clienteRepositorio: Repository<ClienteEntidade>){

    }
    async cadastraCliente(cliente: ClienteEntidade): Promise<ClienteEntidade>{

        const clienteEnti:  ClienteEntidade = await this.clienteRepositorio.save(cliente);

        return clienteEnti
        
    }

    async listarClientes():Promise<ClienteEntidade[]>{
        return await this.clienteRepositorio.find()
    }

    async listarCliente(id: number): Promise<ClienteEntidade | null>{
        
        return await this.clienteRepositorio.findOne({
            where:{ codigo: id}
        })
    }

    async verificaSeClinteExiste(emaiil: string): Promise<ClienteEntidade | null>{
       return await this.clienteRepositorio.findOne({
           where:{email: emaiil}
        })
    }
}