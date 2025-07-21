
# Projeto GQS3

Este repositório contém a aplicação de gerenciamento de livros e autores, com testes automatizados de integração usando **Jest** e testes de interface com **Cypress**.

---

## Tecnologias

- Node.js
- Express.js
- PostgreSQL
- EJS
- Jest
- Supertest
- Cypress
- Dotenv
- Nodemon

---

## Clonando o Projeto

```bash
git clone https://github.com/JeaneMirele/GQS3.git
cd GQS3
```

---

## Instalando Dependências

```bash
npm install
```

---

## Configurando Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as configurações do banco:

```env
NODE_ENV=development

DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=seu_banco
```

E um `.env.test` (para rodar os testes):

```env
NODE_ENV=test

DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=banco_de_teste
```

---

## Rodando a Aplicação

```bash
npm run dev
```

## Rodando Testes de Integração (Jest)

```bash
npm run test
```

> Certifique-se de ter um banco de dados de teste configurado corretamente no `.env.test`.

---

## Rodando Testes com Cypress

### Abrir o Test Runner (modo interativo):

```bash
npx cypress open
```

### Ou rodar via script:

```bash
npm run cypress
```


## Estrutura de Pastas

```
├── src
│   ├── controllers
│   ├── database
│   ├── model
│   ├── routes
│   ├── views
│   ├── public
│   └── app.js
├── tests
│   └── integration
├── cypress
│   └── e2e
├── .env
├── .env.test
├── package.json
└── README.md
```

