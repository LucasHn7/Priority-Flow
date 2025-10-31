Feature: Criar ticket
    Como um usuário da aplicação
    Quero cadastrar tickets no sistema
    Para registrar chamados

    Cenário: Criar um ticket com sucesso
        Dado que estou na página inicial do sistema
        Quando preencho o campo "Título" com "Sistema não loga"
        E preencho o campo "Descrição" com "Meu sistema está completamente parado e não consigo trabalhar."
        E seleciono o tipo de cliente "PREMIUM"
        E clico no botão "Criar Ticket"
        Então o ticket deve ser salvo no banco de dados com status "PENDENTE"
        E deve ser exibido um alerta de confirmação
        E o texto do campo "Título" deve ser apagado 
        E o texto do campo "Descrição" deve ser apagado 
        E o campo "Tipo de Cliente" deve exibir a opção "GRATUITO"
        E o ticket cadastrado deve aparecer na Fila Pendente sem que a página seja atualizada

    Cenário: Tentar criar um ticket sem preencher o título
        Dado que estou na página inicial do sistema
        Quando não preencho o campo "Título"
        E preencho o campo "Descrição" com "Meu aplicativo está fora do ar."
        E seleciono o tipo de cliente "BASICO"
        E clico no botão "Criar Ticket"
        Então deve aparecer um alerta de obrigatoriedade no campo "Título"
        E o ticket não deve ser criado
        E nenhuma requisição de cadastro deve ser feita

    Cenário: Tentar criar um ticket sem preencher a descrição
        Dado que estou na página inicial do sistema
        Quando preencho o campo "Título" com "Erro ao salvar"
        E não preencho o campo "Descrição"
        E seleciono o tipo de cliente "GRATUITO"
        E clico no botão "Criar Ticket"
        Então deve aparecer um alerta de obrigatoriedade no campo "Descrição"
        E o ticket não deve ser criado
        E nenhuma requisição de cadastro deve ser feita

    Cenário: Tentar criar um ticket sem preencher o título e a descrição
        Dado que estou na página inicial do sistema
        Quando não preencho o campo "Título"
        E não preencho o campo "Descrição"
        E seleciono o tipo de cliente "PREMIUM"
        E clico no botão "Criar Ticket"
        Então deve aparecer um alerta de obrigatoriedade no campo "Título"
        E o ticket não deve ser criado
        E nenhuma requisição de cadastro deve ser feita