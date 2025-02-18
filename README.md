
# classMate-App

## Visão Geral
O **classMate-App** é um frontend mobile desenvolvido para ajudar estudantes e docentes a gerenciar suas postagens. A aplicação oferece uma interface intuitiva e funcionalidades como gestão de postagens, gestão de usuários, visualização de postagens e sincronização em nuvem.

Este documento descreve a arquitetura do sistema, as tecnologias utilizadas, o fluxo de uso da aplicação e como iniciar o projeto.

## Arquitetura do Sistema
A arquitetura do **classMate-App** é dividida em três camadas principais:

### Frontend
- **Tecnologias:** React Native, Expo, Redux, React Navigation
- **Descrição:** O frontend é responsável pela interface do usuário e pela interação direta com o estudante. Ele se comunica com o backend por meio de APIs RESTful.
- **Principais Funcionalidades:**
  - Tela de login e autenticação (Firebase Authentication).
  - Gestão de postagens (criação, edição e exclusão).
  - Visualização de postagens.
  - Gerenciamento de usuários (docentes e alunos) [criação, edição e exclusão].
  - Visualização de usuários (docentes e alunos)

### Autenticação
- **Tecnologia:** Firebase Authentication
- **Descrição:** Gerencia a autenticação de usuários, incluindo login com e-mail e senha.

## Fluxo de Uso da Aplicação

### Autenticação
- O usuário abre o aplicativo sendo direcionado para a tela de login.
- Ele pode se autenticar usando e-mail/senha.
- Após a autenticação bem-sucedida, o usuário é redirecionado para a tela principal.

### Gestão de Postagens
- Na tela principal, o usuário (administrador) pode visualizar postagens em uma listagem.
- Para adicionar uma nova postagens, o usuário clica no botão "Criar Postagem" e preenche os detalhes (título, conteúdo, autor).
- Postagens podem ser editadas ou excluídas diretamente na lista.

### Gestão de Usuários
- Tela onde o usuário pode visualizar uma listagem de todos os usuários
- Para adicionar um novo usuário, o usuário clica no botão "Criar Usuário" e preenche os detalhes (nome, e-mail, senha, posição).
- Usuários podem ser editados ou excluídos diretamente na lista.

### Sincronização em Nuvem
- Todas as postagens e configurações são sincronizadas com o banco de dados em nuvem.
- O usuário pode acessar seus dados de qualquer dispositivo após fazer login.

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI

### Passos para Configuração
#### Clone o repositório:
```bash
git clone https://github.com/ramonsimoes/classMate-App.git
cd classMate-App
```

#### Instale as dependências:
```bash
npm install
# ou
yarn install
```

#### Scripts Disponíveis
Os scripts abaixo podem ser executados para diferentes funcionalidades no projeto:
- `npm run start`: inicia o emulador
- `npm run android`: inicia o emulador para Android
- `npm run ios`: inicia o emulador para iOS
- `npm run web`: inicia o emulador para Web

#### Acesse o app
   - Use o emulador do Expo ou o aplicativo Expo Go no seu celular para rodar o app.
