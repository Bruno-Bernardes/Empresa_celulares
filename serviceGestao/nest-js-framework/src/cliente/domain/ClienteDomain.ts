export class ClienteDomain{
    private codigo ?: number;
    private nome: string;
    private email: string;

    constructor(nome: string, email: string){
        this.nome = nome
        this.email = email;
    }

    public get getNome(){
        return this.nome;
    }

    public  get getEmail(){
        return this.email
    }

    public get getCodigo(){
        return this.codigo;
    }

}