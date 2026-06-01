import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'pagamentos'})
export class PagamentoEntidade{
    @PrimaryGeneratedColumn()
    private codigo!: number
    @Column({type: "int", name: "codigo_assinatura"})
    private codigoAssinatura: number
    @Column("decimal", { precision: 10, scale: 2 })
    private valorPago: number;
    @Column({type: "date"})
    private dataPagamento: Date;

    constructor(codigoAssinatura: number,valorPago: number, dataPagamento: Date){
        this.codigoAssinatura = codigoAssinatura
        this.valorPago = valorPago;
        this.dataPagamento = dataPagamento
    }

    public get getCodigo(){
        return this.codigo
    }

    public get getCodigoAssinatura(){
        return this.codigoAssinatura
    }
    public get getValorPago(){
        return this.valorPago;
    }

    public get getDataPagamento(){
        return this.dataPagamento;
    }
}