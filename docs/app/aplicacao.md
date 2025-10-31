# Priority Flow

O Priority Flow é um sistema de triagem de tickets para classificação. Garantindo ao usuário agilidade e clareza para gerenciamento dos tickets.

## Instruções de Uso

### Pré-requisitos
- Docker instalado

### Configurações Iniciais
1. Copie o arquivo `.env.example` para `.env` na raiz do projeto.

2. Atualize as seguintes variáveis:
    ```bash
    # PostgreSQL
    DB_CONNECTION=pgsql
    DB_HOST=postgres
    DB_PORT=5432
    DB_DATABASE=priority_flow_db
    DB_USERNAME=root
    DB_PASSWORD=E61jAT7t

    # pgAdmin
    PGADMIN_EMAIL=admin@admin.com
    PGADMIN_PASSWORD=admin
    PGADMIN_PORT=5050
    ```

3. Suba os containers:
    ```bash
    docker compose up -d --build
    ```
    Caso já esteja buildado:
    ```bash
    docker compose up -d
    ```

4. Configure o backend:
   ```bash
   docker compose exec backend php artisan key:generate
   docker compose exec backend php artisan migrate
   ```

### Acessos

- **pgAdmin (Banco de dados):**
    - Acessar: http://localhost:5050
    - Email: admin@admin.com
    - Senha: admin

    - **Adicione o servidor utilizando:**
        - Host: postgres
        - Port: 5432
        - Database: priority_flow_db
        - Username: root
        - Password: E61jAT7t

- **Frontend:**
    - Acessar: http://localhost:5173/

## Tecnologias

### Backend
- **Laravel:** Visando agilizar o desenvolvimento, escolhi o Laravel para o backend por fornecer uma estrutura organizada e parcialmente pronta para o que preciso.

- **PostgreSQL:** Utilizei PostgreSQL por ser robusto e amplamente utilizado.

### Frontend
- **React:** É uma biblioteca muito conhecida e utilizada. Considerei com o objetivo de adquirir experiência com ela.

- **Vite:** Para buildar o front da aplicação e facilitar o desenvolvimento com hot reload.

- **Bootstrap:** Por fornecer componentes prontos, reduzindo o tempo de desenvolvimento.

- **Axios:** Para realizar chamadas da API e ser consideravelmente simples para o uso nesse projeto.

### Infraestrutura

- **Docker:** Para ter um ambiente padronizado e facilitar o uso da aplicação localmente.

- **pgAdmin:** Utilizei para fornecer uma interface gráfica para gerenciamento do banco de dados.

## Decisões

Decidi iniciar o projeto com uma estrutura separando **backend** e **frontend**, a fim de uma organização mais clara.

Em seguida, decidi que utilizaria o **docker** por ter familiaridade com a tecnologia e também para facilitar o desenvolvimento, sem a necessidade de realizar muitas configurações ou instalações diretamente na minha máquina. Apesar de conhecer a ferramenta e utilizá-la no dia a dia, nunca havia configurado um docker. Realizei algumas buscas e consegui chegar em uma configuração que me atendesse.

Com o docker configurado, rodei dentro de um container temporário o comando para criação do projeto Laravel na pasta backend e dentro da pasta `frontend/`, rodei o comando para criação do projeto **Vite** e aproveitei para instalar as bibliotecas **Bootstrap** e **Axios**.

Optei por utilizar um `.env` para armazenar informações de conexão com o banco. Inicialmente estava utilizando o `.env` criado pelo Laravel em `backend/`, porém, decidi centralizar tudo em um arquivo na raiz do projeto para facilitar a configuração.

Após isso realizei a criação e configuração das **Migrations**, **Models** e **Controllers**, onde pensei em duas tabelas, uma para os **tickets** e outra para os **clientes**. Cheguei a criá-las, porém, mais pra frente voltei atrás na decisão para agilizar o desenvolvimento, sendo assim, mantive apenas o **tickets**.

Finalizei as configurações do backend criando as rotas das APIs REST.

No frontend, instanciei o **Axios** com uma **baseUrl** e criei os serviços dos tickets com a chamada equivalente.

Com os serviços configurados, comecei a organizar o frontend removendo alguns arquivos que julguei desnecessários para o projeto. E com isso, fui estruturar os elementos da aplicação. 

Após algumas pesquisas, escolhi separar os elementos na pasta `components/`. Com eles separados, comecei a definir os elementos, sem estilização, e construir algumas lógicas para exibição.
Depois que os componentes estavam prontos, parti para o `App.jsx`, desenvolvendo algumas lógicas da página e implementando os componentes. Achei que o arquivo ficou claro e organizado, graças à separação dos componentes.

Em sequência, comecei a estilizar os elementos, buscando um resultado visual consistente. Priorizei as estilizações principais, fazendo com que alguns elementos ficassem um pouco divergentes do layout planejado.

## Melhorias

### Principais/Fundamentais:
- **Gestão de tickets:** Implementar um gerenciamento de tickets (editar e excluir).
- **Ordenação de tickets:** Inserir filtros para que seja possível buscar por tickets e ordenar a exibição.
- **Usuários do sistema:** Poderia ser implementado uma tela para gestão de usuários, inicialmente um CRUD simples, evoluindo posteriormente uma gestão de permissões por usuários.
- **Tela de login:** Com usuários cadastrados, seria possível implementar uma tela de login com autenticação e validação de dados.
- **Gestão de clientes:** Adicionar a possibilidade de gerenciamento de clientes, sendo possível vincular o tipo de cliente e definir outras informações. Sendo possível ser feito em outra página ou em um modal. 
- **Ajustar formulários:** Tendo usuários cadastrados no sistema, seria possível vinculá-los aos tickets, buscando por nome ou algum identificador único (CPF). Com isso, informações do cliente seriam preenchidas em novos campos do formulário e haveria um vínculo entre ticket e cliente.

### Outras melhorias:
O projeto é interessante e comporta diversas outras melhorias, o formulário pode se tornar um modal aberto a partir de um botão, abrindo espaço para outros elementos na tela, o usuário que abriu o ticket pode ser vinculado para que possa acompanhar o processo, a UX pode ser melhorada substituindo os alerts e adicionando notificações ou modais na própria aplicação, a aplicação pode integrar com um sistema de cadastro de tickets, pode possibilitar que o cliente cadastre o próprio ticket, etc.