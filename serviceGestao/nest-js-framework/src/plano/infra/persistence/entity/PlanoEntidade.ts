import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'planos'})
export class PlanoEntidade{
    @PrimaryGeneratedColumn()
    codigo!: number;
    @Column({type: "varchar"})
    nome: string;
    @Column("decimal", { precision: 10, scale: 2 })
    public custoMensal: number;
    @Column({type: "date"})
    private data: Date;
    @Column({type: "varchar"})
    private descricao: string;

    constructor(nome: string, custoMensal: number, descricao: string){
        this.nome = nome;
        this.custoMensal = custoMensal;
        this.data = new Date()
        this.descricao = descricao
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