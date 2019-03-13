# hacker-news

## Installation

Requires [Node.js](https://nodejs.org/) v8+ and [yarn](https://yarnpkg.com/).

```sh
git clone https://github.com/jonathanrtuck/hacker-news.git
cd hacker-news
yarn
```

## Development

```sh
yarn develop
```

This will start a hot-reloading development environment accessible at [http://localhost:8080/](http://localhost:8080/).

## Deployment

```sh
yarn build
```

This will perform an optimized production build. The contents of the `/dist` folder can then be deployed to the production server.
