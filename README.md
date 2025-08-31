# To-Do List Application - Desafio Técnico iBolt

Aplicação full-stack para gerenciamento de tarefas desenvolvida como desafio técnico para vaga de estágio em desenvolvimento de software.

## Tecnologias Utilizadas

### Backend
- **Java 17** - Linguagem de programação
- **Spring Boot 3.5.5** - Framework para desenvolvimento de APIs REST
- **Spring Data JPA** - Abstração para persistência de dados
- **MySQL 8** - Sistema de gerenciamento de banco de dados
- **Maven** - Gerenciador de dependências e build
- **Hibernate** - ORM para mapeamento objeto-relacional

### Frontend
- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server moderno
- **Axios** - Cliente HTTP para comunicação com API
- **CSS3** - Estilização da interface

### DevOps
- **Docker** - Containerização da aplicação
- **Docker Compose** - Orquestração de containers
- **Nginx** - Servidor web e proxy reverso

## Estrutura do Projeto

```
todo-app-ibolt/
├── backend/                 # API Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/com/ibolt/todoapi/
│   │       │   ├── controller/      # Controladores REST
│   │       │   ├── service/         # Lógica de negócio
│   │       │   ├── repository/      # Acesso aos dados
│   │       │   └── entity/          # Entidades JPA
│   │       └── resources/
│   │           └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                # Interface React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── services/        # Comunicação com API
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml       # Orquestração de containers
└── README.md
```

## Funcionalidades Implementadas

### API REST (Backend)
- **POST /tasks** - Criar nova tarefa
- **GET /tasks** - Listar todas as tarefas
- **GET /tasks/{id}** - Buscar tarefa por ID
- **PUT /tasks/{id}** - Atualizar tarefa existente
- **DELETE /tasks/{id}** - Remover tarefa

### Interface Web (Frontend)
- ✅ Listagem de tarefas com status visual
- ✅ Criação de novas tarefas via formulário
- ✅ Edição de tarefas existentes
- ✅ Marcação de tarefas como concluídas/pendentes
- ✅ Remoção de tarefas com confirmação
- ✅ Interface responsiva e moderna

### Recursos Técnicos
- ✅ Validação de dados no backend e frontend
- ✅ Timestamps automáticos (criação e atualização)
- ✅ Tratamento de erros e feedback ao usuário
- ✅ Arquitetura em camadas bem definida
- ✅ CORS configurado para comunicação frontend-backend

## Executando com Docker (Recomendado)

### Pré-requisitos
- Docker
- Docker Compose

### Instruções
```bash
# 1. Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd todo-app-ibolt

# 2. Execute com Docker Compose
docker-compose up --build

# 3. Aguarde todos os serviços iniciarem (pode demorar alguns minutos na primeira execução)

# 4. Acesse a aplicação
# Frontend: http://localhost:3000
# API: http://localhost:8080/tasks
```

### Parar a aplicação
```bash
docker-compose down
```

### Remover dados persistidos
```bash
docker-compose down -v
```

## Executando Localmente (Desenvolvimento)

### Pré-requisitos
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven

### Backend
```bash
# 1. Configurar MySQL
# Criar database: todo_app
# Usuário: root, Senha: 123456

# 2. Navegar para pasta backend
cd backend

# 3. Executar aplicação
./mvnw spring-boot:run
# Windows: mvnw.cmd spring-boot:run

# API disponível em: http://localhost:8080
```

### Frontend
```bash
# 1. Navegar para pasta frontend
cd frontend

# 2. Instalar dependências
npm install

# 3. Executar em modo desenvolvimento
npm run dev

# Interface disponível em: http://localhost:3000
```

## Configuração do Banco de Dados

### Estrutura da Tabela `tasks`
```sql
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

### Script de Dados de Exemplo
```sql
INSERT INTO tasks (title, description, completed, created_at, updated_at) VALUES
('Configurar ambiente de desenvolvimento', 'Instalar Java, Node.js e Docker', true, NOW(), NOW()),
('Implementar API REST', 'Criar endpoints CRUD para tarefas', true, NOW(), NOW()),
('Desenvolver interface React', 'Criar componentes para gerenciar tarefas', false, NOW(), NOW());
```

## Testando a API

### Exemplos de Requisições

#### Criar Tarefa
```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nova tarefa",
    "description": "Descrição da tarefa"
  }'
```

#### Listar Tarefas
```bash
curl http://localhost:8080/tasks
```

#### Atualizar Tarefa
```bash
curl -X PUT http://localhost:8080/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarefa atualizada",
    "description": "Nova descrição",
    "completed": true
  }'
```

#### Deletar Tarefa
```bash
curl -X DELETE http://localhost:8080/tasks/1
```

## Arquitetura e Padrões Utilizados

### Backend (Spring Boot)
- **Arquitetura em Camadas**: Separação clara entre Controller, Service e Repository
- **Repository Pattern**: Abstração do acesso aos dados
- **Dependency Injection**: Gerenciamento automático de dependências
- **Bean Validation**: Validação declarativa de dados
- **JPA/Hibernate**: ORM para mapeamento objeto-relacional

### Frontend (React)
- **Componentes Funcionais**: Uso de hooks para gerenciamento de estado
- **Fetch API**: Comunicação com backend via HTTP
- **Responsividade**: Interface adaptável a diferentes tamanhos de tela
- **Gerenciamento de Estado**: useState para controle local de estado

### DevOps
- **Containerização**: Isolamento de dependências e portabilidade
- **Multi-stage Build**: Otimização de imagens Docker
- **Orquestração**: Comunicação entre containers via Docker Compose
- **Proxy Reverso**: Nginx para servir frontend e rotear API

## Considerações de Segurança

- Validação de dados no backend e frontend
- Sanitização de entrada de usuário
- CORS configurado adequadamente
- Senhas de banco não expostas em código (uso de variáveis de ambiente no Docker)

## Possíveis Melhorias Futuras

- [ ] Autenticação e autorização de usuários
- [ ] Testes unitários e de integração
- [ ] Paginação para listas grandes
- [ ] Filtros e busca de tarefas
- [ ] Notificações em tempo real
- [ ] Deploy automatizado (CI/CD)
- [ ] Monitoramento e logs estruturados
- [ ] Cache para melhor performance
- [ ] Backup automatizado do banco de dados

## Licença

Este projeto foi desenvolvido como desafio técnico e está disponível para fins educacionais.

## Desenvolvedor

Desenvolvido como parte do processo seletivo para estágio em desenvolvimento de software na iBolt.

---

**Data de desenvolvimento:** Agosto 2025  
**Versão:** 1.0.0