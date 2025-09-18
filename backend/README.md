# Mock API

## Descrição

Esta é uma API RESTful desenvolvida com Express.js que simula a gestão de uma carteira digital para uma plataforma de apostas. Ela permite registrar jogadores, realizar login, efetuar apostas, consultar apostas e transações, além de cancelar apostas.

## Requisitos

- Node.js >= 14.x
- Yarn ou npm

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/camargo-leonardo/mock-api.git
   cd mock-api

   ```

2. Acesse o diretório do projeto:

   ```bash
   cd /path/mock-api

   ```

3. Instale as dependências utilizando o Yarn:

   ```bash
   yarn
   ```

## Execução

1. Para rodar a API em ambiente local:

   ```bash
   yarn start
   ```

O servidor estará disponível em: http://localhost:3000.

## Documentação Swagger

A documentação da API pode ser acessada no endpoint /docs:
http://localhost:3000/docs

## Endpoints

1. Registro de Jogador

- **Rota**: `/register`
- **Método**: `POST`
- **Descrição**: Cria um novo jogador.
- **Body**:
  - `name`: Nome do jogador
  - `email`: E-mail do jogador
  - `password`: Senha do jogador
  - `confirmPassword`: Confirmação da senha

2. Login de Jogador

- **Rota**: `/login`
- **Método**: `POST`
- **Descrição**: Realiza o login de um jogador.
- **Body**:
  - `email`: E-mail do jogador
  - `password`: Senha do jogador

3. Realizar Aposta

- **Rota**: `/bet`
- **Método**: `POST`
- **Descrição**: Realiza uma aposta.
- **Headers**:
  - `Authorization`: Token de autenticação (Bearer token)
- **Body**:
  - `amount`: Valor da aposta

4. Consultar Apostas

- **Rota**: `/my-bets`
- **Método**: `GET`
- **Descrição**: Consulta as apostas do jogador.
- **Headers**:
  - `Authorization`: Token de autenticação (Bearer token)
- **Query Params**:
  - `page`: Número da página
  - `limit`: Quantidade de resultados por página
  - `id` (opcional): ID da aposta
  - `status` (opcional): Status da aposta (`win`, `lost`, `canceled`)

5. Cancelar Aposta

- **Rota**: `/my-bet/:id`
- **Método**: `DELETE`
- **Descrição**: Cancela uma aposta.
- **Headers**:
  - `Authorization`: Token de autenticação (Bearer token)
- **Params**:
  - `id`: ID da aposta a ser cancelada

6. Consultar Transações

- **Rota**: `/my-transactions`
- **Método**: `GET`
- **Descrição**: Consulta as transações do jogador.
- **Headers**:
  - `Authorization`: Token de autenticação (Bearer token)
- **Query Params**:
  - `page`: Número da página
  - `limit`: Quantidade de resultados por página
  - `id` (opcional): ID da transação
  - `type` (opcional): Tipo da transação (`bet`, `win`, `cancel`)

## Tecnologias Utilizadas

- Node.js
- Express.js
- Faker.js
- Swagger

## Observações

Essa API é uma mock criada especificamente para auxiliar e simplificar o desenvolvimento do teste de front-end. Sinta-se à vontade para fazer qualquer modificação ou melhoria, caso necessário.
