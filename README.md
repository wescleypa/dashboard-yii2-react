# Sistema de Gestão com Yii2 (Backend) + React (Frontend)

![Yii2](https://img.shields.io/badge/Yii2-2.0.48-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![RESTful](https://img.shields.io/badge/API-RESTful-orange)

## 📌 Visão Geral
Sistema simples com:
- Autenticação JWT
- CRUD de usuários/clientes e produtos
- Relatórios gráficos e estatísticas
- Exportação para PDF/Excel

## 🛠️ Pré-requisitos
- PHP 7.4+
- Composer
- Node.js 16+
- Yarn/NPM
- MySQL 5.7+

## 🔐 Autenticação
Rotas protegidas por JWT:
```bash
Headers: { "Authorization": "Bearer <token>" }
- POST /user/login - Gera token
- POST /user/login-with-token - Login com token
- YII2 -> product
- YII2 -> client
- YII2 -> user
- YII2 -> report
- YII2 -> customer-product

- POST: Create
- PUT: Update
- DELETE: Delete
- GET: List
```

## 🛠️ Pré-requisitos
- PHP 7.4+
- Composer
- Node.js 16+
- Yarn/NPM
- MySQL 5.7+

## 📦 Estrutura de Arquivos
```bash
vianashop/
├── backend/                 # Código backend (API)
│   ├── components/           # Componentes
│   │   ├── JwtHelper          # Gerenciamento de tokens (JWT)
│   │   ├── JwtHttp            # Gerenciamento de sessoes (JWT)
│   ├── config/              # Configuracoes
│   │   ├── db                 # Configuracao MySQl
│   │   ├──web                 # Configuracao WEB (rotas e controllers)
│   ├── controller/          # Controladores
│   └── models/              # Modelos de busca
│
└── frontend/
    ├── public/               # Arquivos estáticos
    └── src/
        ├── components/       # Componentes reutilizáveis
        │   ├── AppBar         # Barra de navegação superior
        │   ├── Drawer/        # Menu lateral
        │   ├── DefaultPage    # Template de página padrão
        │   ├── ImageUpload    # Componente de upload de imagens
        │   └── ThemeToggle    # Alternador de tema claro/escuro
        │
        ├── hooks/            # Hooks customizados
        │   ├── ChartsDash/    # Lógica para gráficos do dashboard
        │   ├── ChartsExport/  # Lógica para exportar gráficos
        │   └── ChartsReport/  # Lógica para gráficos de relatórios
        │
        ├── pages/            # Páginas da aplicação
        │   ├── Dashboard/    # Página inicial com gráficos
        │   ├── Products/     # Gestão de produtos
        │   ├── Clients/      # Gestão de clientes
        │   ├── Reports/      # Relatórios
        │   └── Login/        # Autenticacao
        │
        ├── providers/        # Providers de contexto
        │   ├── ClientProvider  # Gestão de estado de clientes
        │   ├── ProductProvider # Gestão de estado de produtos
        │   ├── ReportProvider  # Gestão de relatórios
        │   ├── ToastProvider   # Notificações toast
        │   └── UserProvider    # Autenticação e usuário
        │
        ├── services/         # Serviços auxiliares
        │   ├── api.js        # Configuração da API
        │   └── request.js    # Serviço de requisições HTTP
        │
        ├── themes/           # Configurações de tema
        │   ├── dark.js       # Tema escuro
        │   └── light.js      # Tema claro
        │
        ├── Pages.js          # Listagem de páginas dinâmicas
        ├── App.js            # Componente raiz
        └── index.js          # Ponto de entrada
```

## 📄 Licença
MIT

## 🛠️ Componentes e Frameworks utilizados
- YII2 (Backend)
- MUI (Frontend)
- ChartJS (Frontend)
- Axios (Frontend)


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`API_URL`
`FRONT_URL`

`JWT_KEY`

`DB_URL`
`DB_NAME`
`DB_USER`
`DB_PASS`

## 🕶️ Instalação
```bash
composer install
```

## ✅ Inicialização
```bash
composer run start
```

## 😪 Desafios
- Teclado (literalmente)
- CORS nas rotas YII2 e buscas complexas com YII2

## 🙃 Quem sou eu ?
Souwescley.com