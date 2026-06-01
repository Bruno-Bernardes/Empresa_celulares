import { RepositorioAssinatura } from "../../adapters/gateways/RepositorioAssinatura";
import { IEditaAssinatura } from "../ports/input/IEditaAssinatura";

export class EditaAssinatura implements IEditaAssinatura{

    constructor(private repo: RepositorioAssinatura){

    }

    atualizaDataPagamento(id: number, dataPagamento: Date): void {
        this.repo.atualizaDataPagamento(id, dataPagamento);
    }

}