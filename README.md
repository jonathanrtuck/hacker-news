# hacker-news

A material design interface for the [Hacker News feed](https://news.ycombinator.com/news) using its [API](https://github.com/HackerNews/API), mainly just as an excuse to learn [_redux-observable_](https://redux-observable.js.org/) and [React Hooks](https://reactjs.org/docs/hooks-intro.html).

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

This will start a hot-reloading development environment accessible locally at [localhost:8080](http://localhost:8080/).

## Deployment

```sh
yarn build
```

This will perform an optimized production build. The contents of the _/dist_ folder can then be deployed to the production server.

**Note:** You may need to modify the `publicPath` in _webpack.config.js_ to match the server's directory structure.
