### Requisitos

- Docker e Docker Compose instalados
- Node.js e npm instalados

### Projeto de Autenticação e CRUD de Usuários com NestJS e React

***Visão Geral***
Este projeto é uma aplicação completa de autenticação e CRUD de usuários utilizando tecnologias modernas como Redux, MUI, Joi, JWT, Docker e NestJS. A aplicação é dividida em duas partes: Backend (NestJS + PostgreSQL) e Frontend (React).

***Tecnologias Utilizadas***
Backend: NestJS, PostgreSQL, JWT, Joi, Typescript, Passport, TypeORM

Frontend: React, Redux, MUI (Material-UI), Vite, Typescript

Docker: Docker Compose para orquestração dos contêineres

### Passos para Subir o Projeto com Docker
## Instruções para Configuração e Execução

1. **Clone o Repositório**

```sh
git clone https://github.com/agloks/OM-Code
cd seu-repositorio
```

2. **Suba os Contêineres com Docker Compose**

```sh
docker-compose up --build
```

3. **Acesse a Aplicação**

Backend: O backend estará disponível em http://localhost:3300

Frontend: O frontend estará disponível em http://localhost:5173

3. **Observações**

Uma collection postman está sendo disponibilizado para teste das principais rotas do backend.

Nome: OM-Code.postman_collection.json / Versão: 2.1
