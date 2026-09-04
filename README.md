# Arcanjo Películas

Site institucional em React + Vite para a marca Arcanjo Películas.

## Requisitos

- Node.js 18+
- npm

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

## Deploy na Vercel

1. Faça o push do projeto para o GitHub.
2. Acesse https://vercel.com
3. Clique em "Add New Project"
4. Importe o repositório
5. Use as configurações padrão:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Faça o deploy

## Observações importantes

- O projeto é um SPA (single-page app) e não usa rotas dinâmicas.
- Não há dependência de backend.
- Se futuramente for adicionado React Router, configure rewrite para `index.html` na Vercel.
- Para variáveis de ambiente, use os campos de env da Vercel e mantenha o nome bem definido.
