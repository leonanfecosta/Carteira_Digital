# NG.CASH

## Desafio 
Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

### Instruções

Você precisa ter instalado as seguintes ferramentas: [Git](https://git-scm.com), [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/install/).
Será necessário que a porta 3000 e 3001 estejam disponíveis para a aplicação e o Postgres usará a porta 5432.

Antes de subir o cointainer é preciso realizar as instalações das dependências localmente, para isso faça:

```
cd backend
npm install
cd ..
cd frontend
npm install
```
Logo após suba o container docker da aplicação:

```login
docker-compose up -d
docker-compose down // para parar completamente a aplicação
```

Depois disso será rodado o comando `npm start` no front end e o comando `npm run dev`no back end. Após isso a aplicação ja estará disponivel no endereço `http://localhost:3000` e o back end disponível no endereço `http://localhost:3001`.

# Back-End

## Rotas do Usuário

### Register

| Método | Funcionalidade             | URL                                 |
| ------ | -------------------------- | ----------------------------------- |
| `POST` | Realiza o login do usuário | http://localhost:3001/user/register |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "username": "Nome do Usuário",
  "password": "senha_secreta"
}
```

### Login

| Método | Funcionalidade             | URL                              |
| ------ | -------------------------- | -------------------------------- |
| `POST` | Realiza o login do usuário | http://localhost:3001/user/login |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "username": "Nome do Usuário",
  "password": "senha_secreta"
}
```

### Informações do usuário

| Método | Funcionalidade                                    | URL                                |
| ------ | ------------------------------------------------- | ---------------------------------- |
| `GET`  | Recupera as informações do usuário e da sua conta | http://localhost:3001/user/account |

Nessa requisição GET é retornada as seguintes informações

```
{
  "id": 1,
  "username": "Nome do Usuário",
  "accountId": 1,
  "account": {
    "balance": 100,
  }
}
```

## Rotas de Transações

Todos as rotas abaixo necessitam de um token válido, que é gerado no login do usário, para poderem funcionar. Este token deve ser passado pelo `header` da requisição na chave `Authorization`. 

| Método | Funcionalidade                        | URL                               |
| ------ | ------------------------------------- | --------------------------------- |
| POST   | Cria uma nova transação entre contras | http://localhost:3001/transaction |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
 "recipient": "nome do usuário a ser transferido",
 "amount": 5 // valor a set tranferido
}
```

| Método | Funcionalidade                                   | URL                                      |
| ------ | ------------------------------------------------ | ---------------------------------------- |
| GET    | Retorna todas as transações do usuário           | http://localhost:3001/transaction        |
| GET    | Retorna todas as transações do usuário filtradas | http://localhost:3001/transaction/filter |

Nessa requisição GET é retornada as seguintes informações

```
[
 {
   "id": 1, // id do usuário que está transferindo
   "debitedAccountId": 1, // id da conta que está sendo debitada
   "creditedAccountId": 2, // id da conta que está sendo creditada
   "value": 50, // valor a ser tranferido
   "createdAt": "2022-11-21T18:26:01.271Z", // data da transferencia
   "debitedAccount": {
        "id": 1,
        "userAccount": {
        "id": 1,
        "username": "nome do usuário" // nome do usuário que está tranferindo
        }
    },
    "creditedAccount": {
        "id": 2,
        "userAccount": {
        "id": 2,
        "username": "nome do usário" // nome do usuário que está recebendo
        }
    }
]
```

Para recuperar as informações das transações de maneira filtrada, é necessário passar por `query` as seguintes informações:

```
date: "YYYY/MM/DD" // data a ser filtrada
filter: "tipo de filtro" // tipo de filtro a ser aplicado
```

Há diversos tipos de filtros a serem aplicados, sendo eles:

| Filtro            | Funcionalidade                                                            |
| ----------------- | ------------------------------------------------------------------------- |
| date and cash-in  | Retorna todas as transações filtradas por data e por transações recebidas |
| date and cash-out | Retorna todas as transações filtradas por data e por transações feitas    |
| cash-in           | Retorna todas as transações filtradas  por transações feitas              |
| cash-out          | Retorna todas as transações filtradas  por transações feitas              |
| date              | Retorna todas as transações filtradas por data                            |

# Front End

Para ter acesso ao front end da aplicação, basta apenas acessar o endereço `http://localhost:3000/`.

## Página de Login

Página de acesso do usuário onde é preciso digitar seu `username` com mais de 3 caracteres e sua `senha` com 8 caracteres, contendo letras maiúsculas, minúsculas e números. Caso ainda não tenha conta na NG é possível clicar em `Ainda não tenho conta`para realizar seu cadastro.

<p align="center">
  <img src="https://github.com/leonanfecosta/Desafio-NG.CASH/blob/main/frontend/imagens/tela%20de%20login.png" alt="Desafio NG.CASH - Login"/>
</p>

## Página de Resgistro

Página para realizar o cadastro na NG informando `username` e `senha` seguindo os mesmos parametros da tela de login.

<p align="center">
  <img src="https://github.com/leonanfecosta/Desafio-NG.CASH/blob/main/frontend/imagens/tela%20de%20registro.png" alt="Desafio NG.CASH - Registro"/>
</p>

## Tela principal

Com o usuário logado, a tela principal apresenta: 

- balance atual do usuário;

- Seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in;

- Botão para realizar o log-out.

<p align="center">
  <img src="https://github.com/leonanfecosta/Desafio-NG.CASH/blob/main/frontend/imagens/tela%20principal.png" alt="Desafio NG.CASH - Tela Principal"/>
</p>


Ao rolar a tela para baixo, é possível visualizar:

- Tabela com os detalhes de todas as transações que o usuário participou;

- Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;

<p align="center">
  <img src="https://github.com/leonanfecosta/Desafio-NG.CASH/blob/main/frontend/imagens/historico%20de%20transa%C3%A7%C3%A3o.png" alt="Desafio NG.CASH - Histórico de Transações"/>
</p>

