# Desafio-NG.CASH

### Instruções

Você precisa ter instalado as seguintes ferramentas: [Git](https://git-scm.com), [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/install/).
Será necessário que a porta 3000 e 3001 estejam disponíveis para a aplicação e o Postgres usará a porta 5432.

```login
npm run compose:up
npm run compose:down // para parar completamente a aplicação
```

Ao subir o container todas as dependências necessárias serão automaticamente instaladas. 
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

![](/home/leonancosta/.var/app/com.github.marktext.marktext/config/marktext/images/2022-11-21-17-35-30-image.png)

## Página de Resgistro

Página para realizar o cadastro na NG informando `username` e `senha` seguindo os mesmos parametros da tela de login.

![](/home/leonancosta/.var/app/com.github.marktext.marktext/config/marktext/images/2022-11-21-17-42-18-image.png)

## Tela principal

Com o usuário logado, a tela principal apresenta: 

- balance atual do usuário;

- Seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in;

- Botão para realizar o log-out.

![](/home/leonancosta/.var/app/com.github.marktext.marktext/config/marktext/images/2022-11-21-17-44-28-image.png)

Ao rolar a tela para baixo, é possível visualizar:

- Tabela com os detalhes de todas as transações que o usuário participou;

- Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;

![](/home/leonancosta/.var/app/com.github.marktext.marktext/config/marktext/images/2022-11-21-17-51-00-image.png)
