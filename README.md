# Excavation Tracker

**Descrição**: O "Excavation Tracker" é uma aplicação full-stack para gerenciar pontos de escavação, com funcionalidades de cadastro, listagem e visualização. 
A aplicação possui autenticação de pesquisadores, 
permitindo o gerenciamento seguro de pontos. O projeto foi desenvolvido com uma arquitetura moderna e robusta, utilizando **Next.js** para o front-end, 
**Nest.js** para o back-end e **PostgreSQL** como banco de dados.

##  Decisões de Implementação e Boas Práticas

### Stack de Tecnologias
- **NestJS**: Framework para o back-end, utilizado pela sua modularidade e suporte a TypeScript.
- **PostgreSQL**: Banco de dados relacional utilizado pela sua robustez e desempenho.
- **TypeScript**: Usado em todo o projeto para garantir a segurança da tipagem.
- **TypeOrm**: ORM utilizado para simplificar o gerenciamento de banco de dados.
- **Tailwind**: Framework de estilização dos componentes. 

### Boas Práticas
- **Modularização**: O código é organizado em módulos independentes, facilitando manutenção e escalabilidade.
- **Validação de Dados**: Uso de `class-validator` para garantir que os dados de entrada sejam válidos.
- **Tratamento de Erros**: Implementação de filtros de exceção personalizados para um gerenciamento eficiente de erros.
- **Código limpo**: Código organizado e autoleiturável, projetado para ser claro e compreensível sem a necessidade de muitos comentários, alinhado aos princípios da Clean Architecture.
- **Teste de rotas no Insomnia**: Visando maior testabilidade da aplicação, as rotas foram testas no insomnia .

##  Instruções para utilização
- Dê um git clone no projeto
- Entre em cada umas das duas pastas (back e front) e dê um 'npm install' para baixar todas as depêndencias necessárias
- Configure as variáveis de ambiente no backend, para conectar ao banco de dados . É necessário somente criar um database antes, e depois colocar todos os dados no '.env'
 pois o typeorm já configurará todo o restante sozinho
- Suba os dois servidores ao mesmo tempo, com 'npm start' no back e 'npm run dev' no front e está pronto para testar !
