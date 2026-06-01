export class AssinaturaCadastroDto{

    codCli: number
    codPlano: number
    custoFinal: number
    descricao: string

    constructor(codCli: number, codPlano: number, custoFinal: number, descricao: string){
        this.codCli = codCli
        this.codPlano = codPlano
        this.custoFinal = custoFinal
        this.descricao = descricao
    }

}