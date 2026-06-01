# 📡 Sistema de Gestão de Assinaturas — Backend

> Sistema backend para gerenciamento de planos, clientes e assinaturas de provedores de internet.

---

## 🎯 Objetivo

<!-- Preencha aqui o objetivo do projeto -->

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Linguagem | <!-- ex: Node.js, Java, Python --> |
| Framework | <!-- ex: Express, Spring Boot, FastAPI --> |
| Banco de dados (Gestão) | <!-- ex: PostgreSQL, MySQL --> |
| Banco de dados (Faturamento) | <!-- ex: PostgreSQL, MongoDB --> |
| Cache | <!-- ex: Redis, in-memory --> |
| Broker de mensagens | <!-- ex: RabbitMQ, Kafka --> |
| Gerenciador de pacotes | <!-- ex: npm, yarn, maven --> |
| Containerização | <!-- ex: Docker, Docker Compose --> |
| Testes | <!-- ex: Jest, JUnit --> |

---

## 🏗️ Arquitetura

O sistema é composto por **3 serviços independentes** que se comunicam via broker de mensagens e chamadas HTTP síncronas.

```
┌─────────────────┐        ┌──────────────────────┐        ┌──────────────────────┐
│  ServicoGestao  │◄──────►│  ServicoFaturamento  │        │ ServicoPlanosAtivos  │
│  (Principal)    │        │   (Microsserviço)    │        │   (Microsserviço)    │
└────────┬────────┘        └──────────┬───────────┘        └──────────┬───────────┘
         │                            │                                │
         ▼                            ▼                                ▼
  BancoDeDadosGestao       BancoDeDadosFaturamento                  Cache
         │                            │                                │
         └────────────────────────────┴────────────────────────────────┘
                                      │
                                   Broker
```

---

## 📦 Serviços

### ServicoGestao
Serviço principal responsável pelo cadastro e manutenção de clientes, planos e assinaturas. Também processa eventos de pagamento para atualizar a validade das assinaturas.

**Porta padrão:** `<!-- ex: 3000 -->`

### ServicoFaturamento
Microsserviço responsável por registrar todos os pagamentos recebidos e publicar eventos assíncronos para os demais serviços.

**Porta padrão:** `<!-- ex: 3001 -->`

### ServicoPlanosAtivos
Microsserviço de alta performance que responde se uma assinatura está ativa. Utiliza cache interna para evitar consultas repetidas ao ServicoGestao. Ao receber um evento de pagamento, invalida a entrada em cache correspondente.

**Porta padrão:** `<!-- ex: 3002 -->`

---

## 🚀 Como executar


## 🔌 Endpoints

### ServicoGestao — `BASE_URL: /gestao`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/clientes` | Lista todos os clientes |
| GET | `/planos` | Lista todos os planos |
| POST | `/assinaturas` | Cria uma nova assinatura |
| PATCH | `/planos/:idPlano` | Atualiza o custo mensal de um plano |
| GET | `/assinaturas/:tipo` | Lista assinaturas por tipo (TODOS / ATIVOS / CANCELADOS) |
| GET | `/assinaturascliente/:codcli` | Lista assinaturas de um cliente |
| GET | `/assinaturasplano/:codplano` | Lista assinantes de um plano |

### ServicoFaturamento

| Método | Rota | Descrição |
|---|---|---|
| POST | `/registrarpagamento` | Registra um pagamento |

### ServicoPlanosAtivos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/planosativos/:codass` | Verifica se uma assinatura está ativa |

---

## 📨 Eventos (Broker)

| Evento | Publicado por | Consumido por | Descrição |
|---|---|---|---|
| `PagamentoPlanoServicoGestao` | ServicoFaturamento | ServicoGestao | Notifica pagamento para atualizar validade da assinatura |
| `PagamentoPlanoServicoPlanosAtivos` | ServicoFaturamento | ServicoPlanosAtivos | Notifica pagamento para invalidar cache |

---

## 📄 Documentação adicional

- Coleção Postman: `docs/postman_collection.json`
- Diagrama de componentes: `docs/diagrama.png`

---

## 👥 Autores

<!-- Adicione os integrantes do grupo aqui -->
