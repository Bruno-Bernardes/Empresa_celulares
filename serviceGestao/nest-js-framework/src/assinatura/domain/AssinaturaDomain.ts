export class AssinaturaDomain{
    private codigo ?: number
    private codigoPlano: number
    private codigoCliente: number
    private inicioFidelidade !: Date;
    private fimFidelidade !: Date;
    private dataUltimoPagamento !: Date | null;
    private custoFinal: number;
    private descricao: string
    private status ?: string

    constructor(codigoPlano: number, codigoCliente: number,custoFinal: number, descricao: string){
        
        this.codigoCliente = codigoCliente;
        this.codigoPlano = codigoPlano;
        this.custoFinal = custoFinal;
        this.descricao = descricao;
    }

    public set setStatus(status: string){
        this.status = status
    }

    public set setCodigo(codigo: number){
        this.codigo = codigo
    }
    
    public set setInicioFidelidade(inicioFidelidade: Date){
        this.inicioFidelidade = inicioFidelidade
    }
    
    public set setFimFidelidade(fimFidelidade: Date){
        this.fimFidelidade = fimFidelidade
    }

    public set setDataUltimoPagamento(dataUltimoPagamento: Date | null){
        this.dataUltimoPagamento = dataUltimoPagamento
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
        return new Date(this.inicioFidelidade)
    }

    public get getFimFidelidade(): Date{
        return new Date(this.fimFidelidade)
    }

    public get getDataUltimoPagamento(): Date | null{
        if(!this.dataUltimoPagamento){
            return null
        }
        
        return new Date(this.dataUltimoPagamento);
    }

    public get getCustoFinal(){
        return this.custoFinal
    }
    

    public get getDescricao(){
        return this.descricao
    }

    public get getStatus(){
        return this.status
    }
}