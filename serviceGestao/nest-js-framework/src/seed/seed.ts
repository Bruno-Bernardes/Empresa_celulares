import { NestFactory } from "@nestjs/core"
import { AppModule } from "../app.module"
import { DataSource } from "typeorm"
import { ClienteEntidade } from "../cliente/infra/persistence/entity/ClienteEntidade"
import { PlanoEntidade } from "../plano/infra/persistence/entity/PlanoEntidade"
import { AssinaturaEntidade } from "../assinatura/infra/persistence/entity/AssinaturaEntidade"


async function seed(){
    const app = await NestFactory.createApplicationContext(AppModule)

    const dataSource= app.get(DataSource)

    const repoClin = dataSource.getRepository(ClienteEntidade)
    const repoPlan = dataSource.getRepository(PlanoEntidade)
    const repoAss = dataSource.getRepository(AssinaturaEntidade)

    
    const cliente = await repoClin.save([
        new ClienteEntidade("Pessoa1", "Pessoa1@hotmail.com"),
        new ClienteEntidade("Pessoa2", "Pessoa2@hotmail.com"),
        new ClienteEntidade("Pessoa3", "pessoa3@hotmail.com"),
        new ClienteEntidade("Pessoa4", "Pessoa4@hotmail.com"),
        new ClienteEntidade("Pessoa5", "Pessoa5@hotmail.com"),
        new ClienteEntidade("Pessoa6", "Pessoa6@hotmail.com"),
        new ClienteEntidade("Pessoa7", "Pessoa7@hotmail.com"),
        new ClienteEntidade("Pessoa8", "Pessoa8@hotmail.com")

    ])

    const planos = await repoPlan.save([
        new PlanoEntidade("Plus",  80, "Um plano com beneficos plus"),
        new PlanoEntidade("Basic", 50, "Um plano com otimas ofertas basicas"),
        new PlanoEntidade("Basic + ", 60, "Um plano superior ao basic"),
        new PlanoEntidade("Premium", 100, "Um plano quase superior"),
        new PlanoEntidade("Premium + ", 150, "O melhor plano para assinar")
    ])

    const assiantura = await repoAss.save([
        new AssinaturaEntidade(planos[0].getCodigo, cliente[0].getCodigo, 50, "Promoção de primeira assinatura"),
        new AssinaturaEntidade(planos[1].getCodigo, cliente[1].getCodigo, 40, "Promoção de natal"),
        new AssinaturaEntidade(planos[2].getCodigo, cliente[2].getCodigo, 30, "Promoção de dia da arvore"),
        new AssinaturaEntidade(planos[3].getCodigo, cliente[3].getCodigo, 70, "promoçao temporaria para novos assinantes"),
        new AssinaturaEntidade(planos[4].getCodigo, cliente[4].getCodigo, 100, "Promoção por ser o cliente numero cinco")
    ])

    await app.close();
}

seed()