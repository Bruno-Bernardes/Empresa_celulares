import { IDeletaPlano } from "../ports/input/IDeletaPlano";

export class DeletaCachePlano implements IDeletaPlano{

    constructor(private repo:IDeletaPlano){

    }

    deletaPlano(id: number): void {
        this.repo.deletaPlano(id)
    }

}