# Testes

Os testes garantem o funcionamento correto das principais funcionalidades do sistema, cobrindo tanto a lógica de negócio no backend quanto os fluxos de usuário no frontend.

## Instruções de Uso

### Testes Unitários
Localizados em `/backend/tests/Unit`
- Para rodar todos os testes unitários, utilize:
    ```bash 
    docker compose exec backend php artisan test
    ```
- Para rodar um teste específico, utilize:
    ```bash 
    docker compose exec backend php artisan test --filter <nome da function>
    ```

### Testes E2E
Localizados em `e2e/`

#### Pré-requisitos
1. Instalar pacotes node:
    ```bash
    cd e2e/
    npm install
    ```
2. Instalar navegador:
    ```bash
    cd e2e/
    npx playwright install chromium
    ```

3. Docker deve estar rodando (executar na raiz do projeto):
    ```bash
    docker compose up -d
    ```

#### Execução dos testes

- **Rodar todos os testes**:
    ```bash
    cd e2e/
    npm run test
    ```

- **Rodar todos os testes em modo UI**:
    ```bash
    cd e2e/
    npm run test:ui
    ```

- **Rodar todos os testes em modo debug**:
    ```bash
    cd e2e/
    npm run test:debug
    ```

- **Rodar um teste específico**:
    ```bash
    cd e2e/
    npx playwright test tests/<nome-do-teste.spec.js>
    ```

#### Estrutura dos testes

- **`tests/`** Pasta com os testes
    - `process-queue.spec.js`: Testes de processamento de tickets pendentes
    - `tickets-creation.spec.js`: Testes de criação de tickets e validação de campos vazios
    - `urgency-calculation.spec.js`: Testes da regra de classificação de tickets pendentes conforme cliente e palavras-chave

- **`constants/`** Pasta com seletores e dados fixos
    - `data.js`: Dados constantes
    - `selectors.js`: Seletores para elementos

- **`page-objects/`** Pasta com arquivos referentes a cada página
    - `InitialPage.js`: Centralização das interações da página inicial

- **`utils/`** Pasta com funções úteis para toda a automação
    - `utils.js`: Funções utilitárias centralizadas

## Tecnologias

- **Playwright:** Escolhido por ser uma ferramenta moderna e amplamente adotada para testes E2E. Oferece suporte nativo a múltiplos navegadores, interceptação de requisições de rede e uma API expressiva que facilita a escrita dos testes.

- **Faker.js:** Utilizado para geração de dados dinâmicos nos testes, evitando dados fixos e tornando os cenários mais representativos de situações reais.

- **PHPUnit:** Framework padrão do Laravel para testes unitários, utilizado para validar a lógica de negócio de forma isolada.

## Decisões

Optei por separar os testes em dois níveis: **unitários** e **E2E**. Os testes unitários validam as regras de negócio do backend de forma isolada, enquanto os E2E validam os fluxos completos da aplicação, simulando a interação do usuário.

Para os testes E2E, adotei o padrão **Page Objects**, centralizando as interações da página em `InitialPage.js`. Isso evita repetição e facilita a manutenção: qualquer mudança de seletor ou comportamento é corrigida em um único lugar.

A execução dos testes é **sequencial** (`workers: 1`) devido a uma limitação do endpoint de processamento (`POST /api/tickets/process`), que age sobre **todos os tickets pendentes** de uma vez, sem distinção por teste. Em execução paralela, um teste poderia acionar o processamento e esvaziar a fila de outro que ainda não o fez, além de deixar o botão desabilitado para os demais testes que ainda precisam utilizá-lo. Como não há um endpoint de exclusão para isolar o estado entre testes, a execução serial é a alternativa adotada.

Em caso de falha, o teste é reexecutado mais duas vezes para identificar testes instáveis (flaky), e um screenshot é salvo para facilitar o diagnóstico.

## Observações

- A aplicação possui alerts para informar o usuário de algumas ações, como sucesso no cadastro de tickets ou erros nas operações. O Playwright, por padrão, ignora (desabilita) esses dialogs, portanto eles não são tratados nos testes.

## Melhorias

### Principais/Fundamentais:
- **Paralelismo nos testes E2E:** A execução paralela exigiria isolamento de estado entre os testes. Uma solução seria expor endpoints dedicados em `backend/routes/api.php` para criação e exclusão de dados de teste, permitindo que cada teste parta de um banco limpo e independente.
- **Validar alerts:** Adicionar tratativa para capturar e validar os alerts exibidos pela aplicação nos testes.
