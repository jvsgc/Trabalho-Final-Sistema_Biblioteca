# Sistema de Gerenciamento de Biblioteca

Projeto final de Desenvolvimento Web baseado no front-end da N1, agora com front-end React + TypeScript, back-end Java Spring Boot, seguranca com JWT e banco de dados H2.

## Estrutura

```text
Sistema_Biblioteca_Final/
  backend/   API REST em Java Spring Boot
  frontend/  Interface React + TypeScript
```

## Funcionalidades

- Login com Spring Security e token JWT.
- Cadastro publico de usuario comum.
- Dashboard com totais da biblioteca.
- CRUD de livros para usuario administrador.
- CRUD de categorias para usuario administrador.
- Registro de emprestimos e devolucoes.
- Persistencia em banco H2 em arquivo.
- Diagrama do banco em `backend/docs/diagrama-banco.md`.

## Credenciais iniciais

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Administrador | `admin@biblioteca.com` | `admin123` |
| Usuario comum | `user@biblioteca.com` | `user123` |

## Como executar

### 1. Back-end

Requisitos: Java 17 ou superior.

```bash
cd backend
./mvnw spring-boot:run
```

No Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

A API ficara disponivel em `http://localhost:8080`.

### 2. Front-end

Requisitos: Node.js 20 ou superior.

```bash
cd frontend
npm install
npm run dev
```

A interface ficara disponivel em `http://localhost:5173`.

## Banco de dados

O projeto usa H2 em arquivo:

- JDBC URL: `jdbc:h2:file:./data/biblioteca-db`
- Usuario: `sa`
- Senha: vazia
- Console: `http://localhost:8080/h2-console`

O arquivo do banco e criado automaticamente dentro de `backend/data/` quando a API inicia.

## Endpoints principais

| Metodo | Rota | Uso |
| --- | --- | --- |
| POST | `/api/auth/login` | Autenticacao |
| POST | `/api/auth/register` | Cadastro de usuario |
| GET | `/api/dashboard` | Resumo da biblioteca |
| GET/POST/PUT/DELETE | `/api/livros` | Livros |
| GET/POST/PUT/DELETE | `/api/categorias` | Categorias |
| GET/POST | `/api/emprestimos` | Historico e novo emprestimo |
| PATCH | `/api/emprestimos/{id}/devolver` | Devolucao |

## Roteiro para apresentacao

1. Mostrar login com o usuario administrador.
2. Apresentar o dashboard com os totais.
3. Cadastrar uma categoria e um livro.
4. Registrar um emprestimo e conferir a baixa no estoque.
5. Devolver o emprestimo e conferir a atualizacao.
6. Mostrar o diagrama do banco e explicar as tabelas `usuarios`, `categorias`, `livros` e `emprestimos`.
7. Explicar que as rotas protegidas usam JWT e que algumas operacoes exigem perfil administrador.

## GitHub

Para entregar em repositorio, crie um repositorio no GitHub e envie esta pasta:

```bash
git init
git add .
git commit -m "Entrega final sistema biblioteca"
git branch -M main
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
```
