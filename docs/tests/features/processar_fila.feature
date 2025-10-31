Feature: Processar fila pendente
    Como um usuário da aplicação
    Quero processar os tickets pendentes
    Para classificar automaticamente sua urgência

    Cenário: Processar fila com tickets pendentes
        Dado que existem tickets com status "PENDENTE" no banco de dados
        E que estou na página inicial do sistema
        E que existam tickets listados na fila pendente
        Quando eu clico no botão "Processar Fila Pendente"
        Então todos os tickets pendentes devem ser processados
        E cada ticket processado deve ter sua urgência calculada
        E cada ticket processado deve ter seu status alterado para "CLASSIFICADO"
        E os tickets processados devem sair da Fila Pendente
        E os tickets processados devem aparecer na Fila Classificada
        E cada ticket na Fila Classificada deve exibir sua urgência calculada

    Cenário: Processar fila sem tickets pendentes
        Dado que não existem tickets com status "PENDENTE" no banco de dados
        E que estou na página inicial do sistema
        Quando eu clico no botão "Processar Fila Pendente"
        Então o botão "Processar Fila Pendente" deve estar desabilitado
        E não deve ocorrer nenhum processamento
        E nenhuma requisição de processamento deve ser feita