## 👨🏼‍💻 Desenvolvedor

- [Luís Eduardo Mendes de Carvalho](https://github.com/Luisedmendes)

## 💻 Vídeo demostrando funcionalidades

Este teste tem como objetivo analisar o nível de conhecimento com o desenvolvimento de
backends, replicando o escopo do projeto.
Utilizando Node.js com Express, TypeScript e typeORM.

- [Vídeo apresentando as funcionalidades](https://youtu.be/wnV_G-GNJE4)


## 🔥 Instalação e execução

1. Faça um clone desse repositório;
2. Rode o comando `npm install` para instalar as dependencias
3. Configure os dados de conexão no banco no arquivo
`data-source.ts`
4. Crie o database SQL e as tabelas para inserir os dados do sistema:
```SQL
CREATE DATABASE meubd;

CREATE TABLE plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(100) NOT NULL,
  price VARCHAR(100) NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  planId INT,
  FOREIGN KEY (planId) REFERENCES plans(id)
);

```
4. Rode o comando `ts-node-dev src/server.ts`

5. Rode o comando `npx jest __tests__/UserController.test.ts` para realizar os testes.

## Endpoints da API

A API oferece os seguintes endpoints: 
Lembrando que com excessão das rotas cadastro e login as outras necessitam de bearer token, o mesmo é gerado ao realizar login no sistema.

- **`GET /users/listar`**: Retorna uma lista de todos os usuários.
- **`POST /users/login`**: Login de um usuario.
- **`POST /users/cadastro`**: Cria um novo usuário.
- **`PACTH /users/update`**: Atualizar os dados de um usuario.
- **`DELETE /users/delete`**: Deletar um usuario.


- **`POST /planos/selecionar`**: Assina um plano.
- **`POST /planos/cadastro`**: Cadastra um plano.
- **`GET /planos/listar`**: Lista os planos existentes.
- **`DELETE /planos/delete`**: Deleta um plano.
- **`POST /planos/update`**: Atualiza um plano.


## Exemplos de Requisições

Aqui estão alguns exemplos de como fazer solicitações para a API:

```http
CADASTRAR UM USER E LOGIN:
http://localhost:3333/users/cadastro

{
  "name": "John Doe",
  "email": "john@example.com"
}

ASSINAR UM PLANO:
http://localhost:3333/planos/selecionar

{
  "id": 1,
  "planId": 2
}

MOSTRAR DADOS DE USUÁRIO
http://localhost:3333/users/listar
{
  "id": 11,
  
}
