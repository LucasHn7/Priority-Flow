# Bug Report

**ID:** BUG-001
**Título:** Cadastro de tickets idênticos
**Responsável:** Lucas Geremias
**Data de Reporte:** 02/11/2025
**Prioridade:** Média
**Severidade:** Média
**Status:** Aberto

## Descrição
Após preencher o formulário e clicar em "Criar Ticket", o botão continua habilitado, sendo possível clicar nele diversas vezes, o que resulta no cadastro de vários tickets iguais.

## Como reproduzir
1. Acessar a página inicial da aplicação
2. Preencher o formulário de cadastro de ticket
3. Clicar várias vezes no botão "Criar Ticket"

## Comportamento esperado
Botão de cadastro de ticket é bloqueado enquanto a requisição de cadastro não finalizar e os campos não forem resetados.