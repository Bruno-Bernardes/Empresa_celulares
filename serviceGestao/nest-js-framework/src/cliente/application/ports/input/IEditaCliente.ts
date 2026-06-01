import { ClienteDomain } from "../../../domain/ClienteDomain"

export interface IEditaCliente{

    editaNomeCliente(cliente: ClienteDomain): void;
           
    editaEmailCliente(cliente: ClienteDomain): void;
            
        
}