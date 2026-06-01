import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'CachePlanos'})
export class CachePlanoEntidade{
    @PrimaryGeneratedColumn()
    private codigo!: number;
    @Column()
    public codigoAss!: number
    @Column()
    private status: boolean;

    constructor(status: boolean){
        this.status = status;
      
    }
    
    setCodigoAss(codigoAss: number){
        this.codigoAss = codigoAss
    }

    get getCodigo(){
        return this.codigo;
    }

    get getStatus(){
        return this.status
    }
}