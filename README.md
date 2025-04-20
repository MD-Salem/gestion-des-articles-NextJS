# Système de Gestion des Articles

Ce projet est une application [Next.js](https://nextjs.org) créée avec [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Pour Commencer

### Prérequis
- Node.js (version 14 ou supérieure)
- npm, yarn, pnpm ou bun

### Installation

1. Clonez le dépôt :
```bash
git clone [https://github.com/MD-Salem/gestion-des-articles.git]
cd gestion-des-articles
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. Lancez le serveur de développement :
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## Fonctionnalités

- Gestion des articles
- Gestion des auteurs
- Authentification utilisateur
- Interface responsive

## Structure du Projet

- `pages/` - Contient toutes les routes de l'application
- `components/` - Composants réutilisables
- `services/` - Services pour les appels API
- `styles/` - Fichiers CSS et styles
- `types/` - Définitions des types TypeScript

## API Routes

Les routes API sont accessibles sur [http://localhost:3000/api/](http://localhost:3000/api/). 
Le répertoire `pages/api` est mappé vers `/api/*`. Les fichiers dans ce répertoire sont traités comme des [routes API](https://nextjs.org/docs/pages/building-your-application/routing/api-routes).

## Déploiement

La façon la plus simple de déployer cette application Next.js est d'utiliser la [Plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Pour plus de détails, consultez la [documentation de déploiement Next.js](https://nextjs.org/docs/pages/building-your-application/deploying).

## En Savoir Plus

Pour en apprendre davantage sur Next.js :

- [Documentation Next.js](https://nextjs.org/docs) - découvrez les fonctionnalités de Next.js
- [Apprendre Next.js](https://nextjs.org/learn-pages-router) - tutoriel interactif Next.js
