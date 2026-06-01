import { AssinaturaDomain } from "../../../domain/AssinaturaDomain";

export interface ICadastraAssinatura{
    
    cadastraAssinatura(assinatura: AssinaturaDomain):Promise<AssinaturaDomain>;
    
}