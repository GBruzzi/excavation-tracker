# Excavation Tracker

**Descrição**: O "Excavation Tracker" é uma aplicação full-stack para gerenciar pontos de escavação, com funcionalidades de cadastro, listagem e visualização. 
A aplicação possui autenticação de pesquisadores, 
permitindo o gerenciamento seguro de pontos. O projeto foi desenvolvido com uma arquitetura moderna e robusta, utilizando **Next.js** para o front-end, 
**Nest.js** para o back-end e **PostgreSQL** como banco de dados.

Principais funcionalidades:
- **Cadastro e Login de Pesquisadores**: Sistema de autenticação para que os pesquisadores possam ter seu espaço pessoal.
- **Cadastro de Pontos**: Os pesquisadoress podem adicionar, editar e visualizar seus pontos.
- **Listagem de Pontos**: Os potos cadastrados são listados.
- **Exclusão de pontos**: Os pesquisadores podéme excluir os próprios pontos.

## Diferenciais
- **JWT (JSON Web Token)**: A autenticação é realizada por meio de tokens JWT, garantindo sessões seguras e protegendo os dados dos usuários, com um sistema de autenticação moderno e eficaz.
 - **Tabela de pesquisadores**: A tabela de pesquisadores foi devidamente implementada e mais do que isso, foi feito um sistema de cadastro e login para controlar melhor a dinâmica do negócio.
  - **Rotas protegidas**: As rotas foram devidamente testadas e protegidas, no qual para realizar o CRUD de pontos, é necessário o usuário estar devidamente logado como pesquisador .
  - **Associação entre tabelas**: As tabelas de pesquisadores e pontos estão devidamente conectadas seguindo a lógica proposta pelo desafio .

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
