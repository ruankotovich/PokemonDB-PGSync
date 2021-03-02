![](https://fontmeme.com/permalink/210301/8cb2b7084110cd0dec25f30e228b509c.png)

# Méliuz - Backend Pleno

## Introdução

## Ferramentas Utilizadas

### Toolkits
- Elasticsearch  - para a busca por nome/tipo dos pokemons
- PGSync - para sincronizar o banco de dados (PG) com o bundle de buscas (ES)
- PosgtresSQL - para armazenar os dados estaticamente
- Docker/Docker-Composer - para orquestrar e isolar o ambiente de implantação

### Libraries/Linguagens
- Typescript - para agilizar o desenvolvimento
- Express - para expor os serviços
- Joi - para validar a entrada de dados
- Jest + Nock - para adicionar os casos de teste com mock no elasticsearch

## Organização dos Dados


### Migração do arquivo JSON

Para a migração do arquivo JSON recebido, decidi utilizar a própria estrutura do projeto para aproveitar os modelos de entradas de dados, então, o arquivo `scripts/dry-run.ts` basicamente lê o JSON dado (localizado em `assets/pkm.json`), percorre o arquivo linearmente montando uma lista de **Pokemons** e **Tipos** com seus IDs gerados pela lib `uuid` (nesse caso é necessário gerar antes para poder inserir as relações dos pokemons com os tipos no banco de dados), o input de todos esses dados foi realizado em uma transação do banco de dados, para garantir que todas as relações vão íntegras para o armazenamento, ou não vão.

### Diagrama do Banco de Dados

Optei por utilizar relações M:N para mapear os Pokemons com os tipos e com as Equipes.

![](.README_images/c846974d.png)

A tabela **Types** armazena os tipos pertencentes aos pokemons, a tabela **Pokemons** armazena os pokemons propriamente ditos, a tabela **Teams** armazena as equipes. Já as tabelas **TypeOfPokemons** e **PokemonsOfTeams** armazenam os relacionamentos M:N entre as entidades relacionadas.

### Elasticsearch

O elasticsearch serve muito bem nessa situação, onde um conjunto etático de dados deve ser mantido (no caso, em sincronia com o banco de dados original) e ao mesmo tempo expor uma interface eficiente de busca, nesse caso, o PGSYNC foi configurado para espelhar o esquema do banco de dados de maneira parcial, com alguns atributos das tabelas **Pokemons** e **Types**, o arquivo de configurações se encontra em `infra/services/pgsync/schema.json` e possui as informações de comportamentos das tabelas acima descritas.
