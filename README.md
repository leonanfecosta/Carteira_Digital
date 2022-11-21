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

## Rota do Usuário

### Register

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o login do usuário | http://localhost:3001/user/register |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "username": "Nome do Usuário",
  "password": "senha_secreta"
}
```

### Login

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o login do usuário | http://localhost:3001/user/login |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "username": "Nome do Usuário",
  "password": "senha_secreta"
}
```

### Informações do usuário
| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Recupera as informações do usuário e da sua conta | http://localhost:3001/user/account |

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

#### Times

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos os times cadastrados | http://localhost:3001/teams |
| `GET` | Retorna um time específico | http://localhost:3001/teams/:id |


#### Partidas

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos as partidas cadastradas | http://localhost:3001/matches |
| `GET` | Retorna todos as partidas cadastradas em progresso | http://localhost:3001/matches?inProgress=true |
| `GET` | Retorna todos as partidas cadastradas finalizadas | http://localhost:3001/matches?inProgress=false |
| `POST` | Criação de uma nova partida | http://localhost:3001/matches |
| `PATCH` | Atualiza a chave 'inProgress' para finalidado de uma partida específica | http://localhost:3001/matches/:id/finish |
| `PATCH` | Atualiza os gols de uma partida específica | http://localhost:3001/matches/:id |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "homeTeam": 16, // O valor deve ser o id do time
  "awayTeam": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

e na requisição PATCH para atualizar os gols realizados é necessário informar o seguinte JSON:

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

#### Placar

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna a classificação geral dos times | http://localhost:3001/leaderboard |
| `GET` | Retorna a classificação dos times mandantes | http://localhost:3001/leaderboard/home |
| `GET` | Retorna a classificação dos times visitantes | http://localhost:3001/leaderboard/away |


### Demonstração

<p align="center">
  <img src="https://github.com/guilherme-ac-fernandes/trybe-futebol-clube/blob/main/tfc_classificacao.png" alt="Trybe Futebol Clube - Demostração"/>
</p>

