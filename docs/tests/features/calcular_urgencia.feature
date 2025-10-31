Feature: Calcular urgência de tickets
    Como uma aplicação de triagem de tickets
    Eu quero calcular a urgência de tickets pendentes
    Para definir a prioridade do ticket conforme o tipo de cliente e palavra-chave

    Cenário: Cliente PREMIUM com palavra-chave "parado"
        Dado existe um ticket pendente com tipo de cliente PREMIUM e uma descrição com a palavra "parado"
        Quando for solicitado o processamento de tickets pendentes
        Então devo calcular a urgência do ticket como "CRITICA"
        E alterar o status do ticket para "CLASSIFICADO" no banco de dados

    Cenário: Cliente BASICO com palavra-chave "parado"
        Dado existe um ticket pendente com tipo de cliente BASICO e uma descrição com a palavra "parado"
        Quando for solicitado o processamento de tickets pendentes
        Então devo calcular a urgência do ticket como "ALTA"
        E alterar o status do ticket para "CLASSIFICADO" no banco de dados

    Cenário: Cliente GRATUITO com palavra-chave "lento"
        Dado existe um ticket pendente com tipo de cliente GRATUITO e uma descrição com a palavra "lento"
        Quando for solicitado o processamento de tickets pendentes
        Então devo calcular a urgência do ticket como "BAIXA"
        E alterar o status do ticket para "CLASSIFICADO" no banco de dados

    Cenário: Cliente PREMIUM com palavra-chave "dúvida" e "não funciona"
        Dado existe um ticket pendente com tipo de cliente PREMIUM e uma descrição com a palavra "dúvida" e "não funciona"
        Quando for solicitado o processamento de tickets pendentes
        Então devo considerar palavra de maior impacto
        E devo calcular a urgência do ticket como "CRITICA"
        E alterar o status do ticket para "CLASSIFICADO" no banco de dados

    Cenário: Cliente BASICO sem palavra-chave
        Dado existe um ticket pendente com tipo de cliente BASICO e uma descrição sem nenhuma palavra-chave
        Quando for solicitado o processamento de tickets pendentes
        Então devo calcular a urgência do ticket como "BAIXA"
        E alterar o status do ticket para "CLASSIFICADO" no banco de dados

    Cenário: Cliente PREMIUM com palavra-chave "lento"
        Dado existe um ticket pendente com tipo de cliente PREMIUM e uma descrição com a palavra "lento"
        Quando for solicitado o processamento de tickets pendentes
        Então devo calcular a urgência do ticket como "ALTA"
        E alterar o status do ticket para "CLASSIFICADO" no banco de dados
