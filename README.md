# Priority Flow

Documentação geral do Priority Flow — instruções de uso, documentos da aplicação e da estratégia de testes.

## Documentos da aplicação:
Os documentos relacionados à aplicação se encontram em `/docs/app/`
- **`aplicacao.md`:** Instruções de uso, tecnologias, decisões tomadas e melhorias 

## Documentos de testes:
Os documentos relacionados à testes se encontram em `/docs/tests/`

### Especificações Gherkin
**Localização:** `/docs/tests/features/`
- **`calcular_urgencia.feature`:** Especificações do cálculo de urgências
- **`criar_ticket.feature`:** Especificações da criação de tickets
- **`processar_fila.feature`:** Especificações do processamento de tickets pendentes

### Plano de Testes
O documento com o plano de testes está disponível em `/docs/tests/`
- **`plano-de-testes.md`:** Objetivo, escopo, ambiente, estratégia, tipos de testes, casos de teste, cobertura, riscos e referências
- **`testes.md`:** Instruções de execução, estrutura dos testes, tecnologias utilizadas e decisões técnicas

### Report de bugs
O documento com informações do bug encontrado durante a execução de testes funcionais manuais está disponível em `/docs/tests/`
- **`bug-report.md`:** Informações de uma falha no botão de criação de ticket

## Melhorias Futuras
- **Testes de integração para o backend:** Não implementados nesta versão; os testes E2E cobrem indiretamente algumas validações de requisições.
- **Relatório com SonarQube:** Não configurado nesta versão.