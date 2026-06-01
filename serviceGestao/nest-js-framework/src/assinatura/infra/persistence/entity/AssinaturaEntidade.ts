import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'assinatura'})
export class AssinaturaEntidade{
    
    @PrimaryGeneratedColumn()
    public codigo!: number
    @Column({type:"int", name: "codigo_plano"})
    public codigoPlano: number
    @Column({type:"int", name: "codigo_cliente"})
    public codigoCliente: number
    @Column({type: "date"})
    private inicioFidelidade: Date;
    @Column({type: "date"})
    private fimFidelidade: Date;
    @Column({type: "date", nullable: true})
    public dataUltimoPagamento!: Date | null;
    @Column({type: "decimal", precision: 10, scale: 2})
    private custoFinal: number;
    @Column({type: "varchar"})
    private descricao: string

    constructor(codigoPlano: number, codigoCliente: number,custoFinal: number, descricao: string){
               
        const dataHoje: Date = new Date();
        const dataFutura: Date = new Date(dataHoje)

        dataFutura.setFullYear(dataHoje.getFullYear() + 1);
        this.dataUltimoPagamento = null;
        this.codigoCliente = codigoCliente
        this.codigoPlano = codigoPlano
        this.inicioFidelidade = dataHoje;
        this.fimFidelidade = dataFutura;
        this.custoFinal = custoFinal;
        this.descricao = descricao;
    }

    public get getCodigo(){
        return this.codigo
    }

    public get getCodigoCliente(){
        return this.codigoCliente
    }

    public get getCodigoPlano(){
        return this.codigoPlano
    }

    public get getInicioFidelidade(): Date{
        return new Date(this.inicioFidelidade);
    }

    public get getFimFidelidade(): Date{
        return new Date(this.fimFidelidade)
    }

   public get getDataUltimoPagamento(): Date | null {
    
    if(!this.dataUltimoPagamento){
        return null
    } 
    return new Date(this.dataUltimoPagamento)
   }

    public get getCustoFinal(){
        return this.custoFinal
    }

    public get getDescricao(){
        return this.descricao
    }
}