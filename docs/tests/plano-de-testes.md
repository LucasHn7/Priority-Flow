# Plano de Testes — Priority Flow

## 1. Objetivo

Definir a estratégia de testes do Priority Flow, estabelecendo os tipos de testes utilizados, o ambiente de execução, os critérios de cobertura e os riscos identificados, visando garantir a qualidade do sistema e minimizar riscos.

## 2. Escopo

### 2.1 Dentro do Escopo

| Funcionalidade | Descrição |
|---|---|
| Criação de tickets | Cadastro com título, descrição e tipo de cliente |
| Processamento da fila pendente | Classificação automática de urgência |
| Cálculo de urgência | Regra de negócio por palavra-chave e tipo de cliente |
| Validação de campos obrigatórios | Título e descrição são obrigatórios |

### 2.2 Fora do Escopo

- Testes de integração isolados do backend (não implementados nesta versão)
- Testes de autenticação e controle de acesso (funcionalidade não implementada)
- Testes de edição e exclusão de tickets (funcionalidade não implementada)
- Análise de cobertura de código com SonarQube (não configurado nesta versão)

## 3. Ambiente de Testes

### Ferramentas e Versões

| Ferramenta | Versão | Finalidade |
|---|---|---|
| PHP | 8.2 | Runtime do backend |
| Laravel | 12 | Framework do backend |
| PHPUnit | 11.5 | Testes unitários |
| Node.js | — | Runtime do frontend e E2E |
| React | 19 | Framework do frontend |
| Playwright | 1.56 | Testes E2E automatizados |
| Faker.js | 9.9 | Geração de dados dinâmicos nos testes E2E |
| PostgreSQL | 15 | Banco de dados |
| Docker | — | Ambiente de execução |

### Portas e Acessos

| Serviço | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend (API) | http://localhost:8000 |
| pgAdmin | http://localhost:5050 |
| PostgreSQL | localhost:5433 |

> Para instruções de execução dos testes, consulte [`testes.md`](testes.md).

## 4. Estratégia de Testes

A estratégia prioriza a cobertura da principal regra de negócio (cálculo de urgência) por testes unitários automatizados, complementada pela validação dos fluxos do usuário por testes funcionais manuais e por testes E2E para regressão.

| Prioridade | Abordagem | Justificativa |
|---|---|---|
| Alta | Testes unitários da regra de cálculo de urgência | É a principal regra de negócio do sistema; deve ter todos os casos cobertos de forma isolada e repetível |
| Alta | Testes funcionais manuais dos fluxos principais | Garante que o usuário consegue realizar as operações essenciais em ambiente real |
| Média | Testes E2E automatizados dos fluxos principais | Garante o funcionamento end-to-end e serve como base para testes de regressão |

## 5. Tipos de Testes

### 5.1 Testes Unitários — Caixa Branca

Validam a lógica de cálculo de urgência de forma isolada, com conhecimento do código. Executados com PHPUnit.

- **Localização:** `/backend/tests/Unit/CalculateUrgencyTest.php`
- **Casos cobertos:** 12 casos conforme [`test_cases.json`](test_cases.json)

### 5.2 Testes Funcionais Manuais — Caixa Preta

Validam os fluxos principais a partir da perspectiva do usuário, sem conhecimento do código, verificando se a aplicação atende aos requisitos.

- **Especificações:** [`features/criar_ticket.feature`](features/criar_ticket.feature), [`features/processar_fila.feature`](features/processar_fila.feature), [`features/calcular_urgencia.feature`](features/calcular_urgencia.feature)
- **Casos cobertos:** conforme [`test_cases.json`](test_cases.json)

### 5.3 Testes E2E Automatizados — Caixa Preta

Validam os fluxos completos simulando interações reais do usuário no navegador. Executados com Playwright.

- **Localização:** `/e2e/tests/`
  - `tickets-creation.spec.js` — Criação de tickets e validação de campos obrigatórios
  - `urgency-calculation.spec.js` — Cálculo de urgência por tipo de cliente e palavra-chave
  - `process-queue.spec.js` — Processamento de tickets pendentes

## 6. Casos de Teste

Os casos de teste estão definidos em [`test_cases.json`](test_cases.json) e são compartilhados entre os três tipos de teste. Os 12 casos cobrem:

- Clientes PREMIUM, BÁSICO e GRATUITO com diferentes palavras-chave
- Regra de prioridade entre palavras-chave (a palavra de maior impacto prevalece)
- Ausência de palavra-chave (urgência padrão por tipo de cliente)
- Case insensitive na detecção de palavras-chave

As especificações em formato Gherkin estão em [`features/`](features/):

| Arquivo | Funcionalidade | Cenários |
|---|---|---|
| `calcular_urgencia.feature` | Cálculo de urgência | 6 |
| `criar_ticket.feature` | Criação de tickets | 4 |
| `processar_fila.feature` | Processamento da fila | 2 |

## 7. Cobertura de Testes

| Tipo | Funcionalidade | Cobertura |
|---|---|---|
| Unitário | Regra de cálculo de urgência (12 casos de `test_cases.json`) | 100% |
| Funcional manual | Criação de tickets | 100% |
| Funcional manual | Processamento da fila pendente | 100% |
| Funcional manual | Cálculo de urgência | 100% |
| Funcional manual | Validação de campos obrigatórios | 100% |
| E2E automatizado | Criação de tickets | 100% |
| E2E automatizado | Processamento da fila pendente | 100% |
| E2E automatizado | Cálculo de urgência | 100% |
| E2E automatizado | Validação de campos obrigatórios | 100% |

## 8. Riscos e Limitações

| Item | Descrição | Status |
|---|---|---|
| BUG-001 | Botão "Criar Ticket" permanece habilitado durante a requisição, permitindo cadastros duplicados | Aberto — ver [`bug-report.md`](bug-report.md) |
| Execução serial dos E2E | Os testes E2E são executados com `workers: 1` porque o endpoint `POST /api/tickets/process` age sobre toda a fila global sem isolamento por teste | Limitação conhecida — sem correção nesta versão |
| Ausência de testes de integração | O backend não possui testes de integração isolados; a cobertura end-to-end é feita pelos testes E2E | Limitação conhecida — melhoria futura |
| Alerts não validados | O Playwright desabilita dialogs nativos do browser por padrão; os alerts da aplicação não são verificados nos testes E2E | Limitação conhecida — melhoria futura |

## 9. Referências

| Artefato | Caminho |
|---|---|
| Guia de execução dos testes | [`testes.md`](testes.md) |
| Casos de teste | [`test_cases.json`](test_cases.json) |
| Especificações Gherkin | [`features/`](features/) |
| Report de bugs | [`bug-report.md`](bug-report.md) |
| Testes unitários | `/backend/tests/Unit/CalculateUrgencyTest.php` |
| Testes E2E | `/e2e/tests/` |
