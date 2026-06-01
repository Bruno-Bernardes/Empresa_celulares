export class PagamentoDomain{
    private codigo ?: number
    private codigoAssinatura: number
    private valorPago: number;
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