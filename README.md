# CriticWeb

CriticWeb é uma aplicação web para realizar crítica de filmes. Ela é uma aplicação cliente-servidor, com o front-end em React, Typescript, Vite e Bootstrap5 e o backend sendo API RestFul em Tpescript e Node.js com arquitetura em camadas para separar as rotas, lógica de negócios e persistência ao banco de dados.

Trabalho desenvolvido para a matéria de Programação para Web, ministrada pelo Professor Hudson Silva Borges.
Integrantes:
- Caetano Santana
- Dener Fernandes
- Fernanda Pessoa
- Livia Rosa

Link do Figma: [CriticWeb Figma](https://www.figma.com/design/O6DZoAtm4VoGtO6TyGIGqV/CriticWeb?node-id=2-3&t=Lr9oqXfzm2ZSzyC7-1)

## Como Executar localmente

1. Clone o repostirório com 
  
    `https://github.com/fernandapessoa/criticweb.git`

### Executando o Back-End:

1. Acesse o diretório de CriticWeb-BackEnd:  
  
   `cd .\CriticWeb-BackEnd\`

2. Instale as dependências com 

    `npm i`

3.  Crie um arquivo `.env` seguindo o formato de `.env.example`. Especifique as informações do seu banco de dados e da url que está rodando o front-end. É necessártio ter o Postgres instalado na sua máquina. A interface gráfica pode ser de sua preferência, como DBeaver ou PgAdmin. Crie um banco de dados e um esquema, os nomes devem ser os mesmos definidos no arquivo `.env`. Exemplo:  

        
        TYPEORM_TYPE=postgres
        TYPEORM_HOST=localhost
        TYPEORM_PORT=5432
        TYPEORM_USERNAME=postgres
        TYPEORM_PASSWORD=postgres
        TYPEORM_DATABASE=criticweb
        TYPEORM_SCHEMA=criticweb_schema
        FRONT_END_URL="http://localhost:5173"
        
4. Execute a migração para criar as entidades no banco de dados:

    `npm run typeorm`

5. Execute a aplicação:  

    `npm run start:dev`

6. Para acessar o swagger, acesse no navegador:

    `localhost:8080/criticweb/api-docs`

### Executando o Front-End:

Agora que nosso back-end já está em execução, podemos executar nosso front-end. Para isso, siga as instruções abaixo.

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/en/) instalado em sua máquina.

1. Estando na raiz do projeto, em um novo terminal, acesse o diretório de CriticWeb-FrontEnd:  

    ` cd .\CriticWeb-FrontEnd\`

2. Instale as dependências:

    `npm i`

3. Inicie a aplicação:

    `npm run dev`
