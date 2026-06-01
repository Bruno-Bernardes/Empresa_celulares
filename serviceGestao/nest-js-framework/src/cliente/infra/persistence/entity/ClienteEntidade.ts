import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'clientes'})
export class ClienteEntidade{
    
    @PrimaryGeneratedColumn()
    public codigo!: number;
    @Column({type: "varchar"})
    public nome: string;
    @Column({type: "varchar"})
    public email: string;

    constructor(nome: string, email: string){
        this.nome = nome
        this.email = email;
    }

    public get getNome(){
        return this.nome;
    }

    public get getEmail(){
        return this.email
    }

    public get getCodigo(): number{
        return this.codigo;
    }

    
}