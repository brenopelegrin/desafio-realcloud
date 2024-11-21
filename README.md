# HR Manager (HR.m): Desafio de estágio RealCloud

## O que é o projeto?

Nesse desafio, criei o app "HR Manager", um app simples (CRUD) que permite:
- Fazer login com o Google
- Adicionar, editar e remover pessoas e seus dados
- Filtrar pessoas por nome
- Converter valores (taxas de câmbio)

O projeto está separado entre `frontend` e `backend`.

## Frontend

O frontend é um website client-side construído utilizando `JavaScript` com `React`, `Vite` e a biblioteca `ChakraUI` (v2).
A biblioteca `ChakraUI` foi escolhida devido a facilidade que ela traz para o desenvolvimento de interfaces gráficas, já que possui componentes já prontos.

Foi feito o deploy da aplicação na `vercel`, e o website pode ser acessado [aqui](https://hrdotm.vercel.app)
![image](https://github.com/user-attachments/assets/66ff589f-1682-4f65-bc1b-2d39bcf927b4)
![image](https://github.com/user-attachments/assets/18bc0305-43f0-4d01-976e-ddd0c7da3cc6)


## Backend

O backend é uma API REST construída utilizando `Flask`, `SQLAlchemy` e outros plugins para `Flask`. O banco de dados utilizado foi `PostgreSQL`.

Foi feito o deploy da aplicação na `render`, e a API pode ser acessada [aqui](https://desafio-realcloud-tk13.onrender.com).

**OBS:** como está hospedado no plano gratuito, é necessário 'pingar' a máquina e esperar um pouco até ela ligar automaticamente. 

A autenticação com o Google é feita por OAuth2 e a dança foi implementada da seguinte maneira:
- Usuário clica em "fazer login" no frontend
- Redireciona para `oauth2/google/authorize` no backend que redireciona para o Google
- Google redireciona para `oauth2/google/callback` no backend que gera um token JWT
- Backend redireciona para `oauth2/google/callback?token=...` no frontend, passando o token JWT
- Frontend utiliza o token para autenticar com o backend

Rotas da API:

### `/`
Métodos: `GET`
- `GET`: Retorna informações sobre o projeto em HTML.

### `/health`
Métodos: `GET`
- `GET`: Retorna se a API está saudável

### `/oauth2/google/authorize`
Métodos: `GET`
- `GET`: Inicia a dança de OAuth2 do Google no lado do backend

### `/oauth2/google/callback`
Métodos: `GET`
- `GET`: Final da dança de OAuth2 do Google no lado do backend

### `/oauth2/google/logout`
Métodos: `GET`
- `GET`: Revoga o token do usuário

### `/oauth2/google/test`
Métodos: `GET`
Requer: Header `Authorization: Bearer <token>`
- `GET`: Retorna se o usuário está autenticado

### `/users/`
Métodos: `GET`, `POST`
Requer: Header `Authorization: Bearer <token>`
- `GET`: retorna todos os usuários
- `POST`: cria um novo usuário 

### `/users/<id>`
Métodos: `GET`, `PUT`, `DEL`
Requer: Header `Authorization: Bearer <token>`
- `GET`: retorna o usuário com a ID
- `PUT`: altera dados do usuário com a ID
- `DEL`: deleta o usuário com a ID
