export class CachePlanosDomain{
    private codigo!: number;
    private status: boolean;
    private codAss!: number;

    constructor(codAss: number,status: boolean){
        this.status = status;
        this.codAss = codAss
    }

    get getCodigo(){
        return this.codigo;
    }

    get getStatus(){
        return this.status
    }

}