

# TOConcursos

Uma aplicação web moderna desenvolvida em Next.js para oferecer um ecossistema completo de preparação para concursos públicos, incluindo banco de questões, cronogramas de estudo personalizados e acompanhamento de desempenho dos usuários.

## Stack Utilizada

<span>
  <img src="https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Nextjs">
  <img src="https://img.shields.io/badge/shadcn%2Fui-000?style=for-the-badge&logo=shadcnui&logoColor=fff" alt="Shadcn">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
</span>


## Rodando Localmente 🖥️

Para executar o projeto em seu ambiente local, siga os passos abaixo.

### Pré-requisitos

- **Node.js** 18.0+ (recomendado: versão LTS mais recente)
- **npm** ou **yarn** ou **pnpm**

### Passos

1.  Clone o repositório:

    ```sh
    git clone https://github.com/gustavo-oli-silva/toconcursos-frontend
    ```

2.  Entre no diretório do repositório:

    ```sh
    cd toconcursos-frontend
    ```

3.  Inicie a aplicação Nextjs:

    ```sh
    # usando npm
    npm install
    
    # ou usando yarn
    yarn install
    
    # ou usando pnpm
    pnpm install
    ```

4.  A aplicação estará disponível em `http://localhost:3000`.

## Documentação Completa

Para uma visão mais aprofundada do projeto, como requisitos, diagramas e protótipo acesse o pdf

[TOConcursos docs](https://github.com/Matheus-Nardi/TOconcursos-backend/blob/main/app/docs/Documenta%C3%A7%C3%A3o%20TOCONCURSOS.pdf)

## Estrutura de Pastas

A estrutura do projeto foi organizada para manter uma clara separação de responsabilidades, facilitando a manutenção e escalabilidade.

```
/components             # Componentes React reutilizáveis
    /project            # Componentes específicos do domínio da aplicação
    /ui                 # Componentes de interface (shadcn/ui)

/hooks                  # Custom hooks React para lógica reutilizável

/lib                    # Bibliotecas, configurações e utilitários
    /services           # Serviços de comunicação com APIs externas
    utils.ts            # Funções utilitárias gerais

/types                  # Definições de tipos TypeScript
```
