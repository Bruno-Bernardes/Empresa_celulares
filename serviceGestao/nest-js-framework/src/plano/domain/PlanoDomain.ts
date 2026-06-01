export class PlanoDomain{
    private codigo ?: number;
    private nome: string;
    private custoMensal: number;
    private data ?: Date
    private descricao: string;

    constructor(nome: string, custoMensal: number,descricao: string){
    
        this.nome = nome;
        this.custoMensal = custoMensal;
        this.descricao = descricao
    }

    set setData(data: Date){
        this.data = data
    }

    get getCodigo(){
        return this.codigo;
    }

    get getNome(){
        return this.nome;
    }

    get getCustoMensal(){
        return this.custoMensal
    }

    get getData(){
        return this.data
    }

    get getDescricao(){
        return this.descricao
    }
}