import { ClienteDomain } from "../../domain/ClienteDomain"
import { ClienteEntidade } from "../../infra/persistence/entity/ClienteEntidade"

export class ClienteEntityMapper{

    toEntidade(cliente: ClienteDomain){
        return new ClienteEntidade(cliente.getNome, cliente.getEmail)
    }

    toDominio(cliente: ClienteEntidade){
        return new ClienteDomain(cliente.getNome, cliente.getEmail)
    }
}