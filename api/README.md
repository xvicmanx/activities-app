# API
API for the Activies App
## Setup
```
  npm install
```

## Start
```
  npm start
```
It will start a server at port `4500` by default.

## API documentation
The API documentation consists of a Swagger spec that can be found at [API docs](http://localhost:4500/api-docs)

## Demo

```
Test Login

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"john@activitiesapp.com","password":"pass"}' \
  http://localhost:4500/users/login

It will return a JSON like:

{
  "token":"TOKEN",
  "exp":1583062254,
  "user": {
    "id":100,
    "name":"John Doe",
    "description": "I am awesome and love getting together with my folks"
  },
  "success":true
}
```

## Running tests

```sh
npm test
```

## Running lints

```sh
npm run lint
```

## Running types check

```sh
npm run check:types
```

## Environment variables

```
PORT: Port the api server will be listening to.
NODE_ENV: Node's environment (test, delevopment, production, etc).
DATABASE_NAME: Name of the database
DATABASE_USER: User of the database
DATABASE_PASSWORD: Password of user of the database
DATABASE_HOST:  Database host
DATABASE_DIALECT: Database dialect (mysql, sqlite, etc)
DATABASE_PORT: Database port
```

## Dependencies

- [body-parser](https://ghub.io/body-parser): Node.js body parsing middleware
- [cors](https://ghub.io/cors): Node.js CORS middleware
- [express](https://ghub.io/express): Fast, unopinionated, minimalist web framework
- [express-swagger-generator](https://ghub.io/express-swagger-generator): Generates swagger doc &amp; ui based on express existing routes.
- [faker](https://ghub.io/faker): Generate massive amounts of fake contextual data
- [faye](https://ghub.io/faye): Simple pub/sub messaging for the web
- [jsonwebtoken](https://ghub.io/jsonwebtoken): JSON Web Token implementation (symmetric and asymmetric)
- [lodash](https://ghub.io/lodash): Lodash modular utilities.
- [node-fetch](https://ghub.io/node-fetch): A light-weight module that brings window.fetch to node.js
- [require-all](https://ghub.io/require-all): An easy way to require all files within a directory.
- [sequelize](https://ghub.io/sequelize): Multi dialect ORM for Node.JS
- [sha1](https://ghub.io/sha1): native js function for hashing messages with SHA-1
- [sqlite3](https://ghub.io/sqlite3): Asynchronous, non-blocking SQLite3 bindings

## Dev Dependencies

- [@babel/runtime](https://ghub.io/@babel/runtime): babel&#39;s modular runtime helpers
- [babel-eslint](https://ghub.io/babel-eslint): Custom parser for ESLint
- [@babel/cli](https://ghub.io/@babel/cli): Babel command line.
- [@babel/core](https://ghub.io/@babel/core): Babel compiler core.
- [@babel/node](https://ghub.io/@babel/node): Babel command line
- [@babel/plugin-proposal-class-properties](https://ghub.io/@babel/plugin-proposal-class-properties): This plugin transforms static class properties as well as properties declared with the property initializer syntax
- [@babel/plugin-proposal-decorators](https://ghub.io/@babel/plugin-proposal-decorators): Compile class and object decorators to ES5
- [@babel/plugin-transform-runtime](https://ghub.io/@babel/plugin-transform-runtime): Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals
- [@babel/preset-env](https://ghub.io/@babel/preset-env): A Babel preset for each environment.
- [@babel/preset-flow](https://ghub.io/@babel/preset-flow): Babel preset for all Flow plugins.
- [chai](https://ghub.io/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [enzyme](https://ghub.io/enzyme): JavaScript Testing utilities for React
- [eslint-config-airbnb](https://ghub.io/eslint-config-airbnb): Airbnb&#39;s ESLint config, following our styleguide
- [eslint-config-prettier](https://ghub.io/eslint-config-prettier): Turns off all rules that are unnecessary or might conflict with Prettier.
- [eslint-plugin-flowtype](https://ghub.io/eslint-plugin-flowtype): Flowtype linting rules for ESLint.
- [eslint-plugin-import](https://ghub.io/eslint-plugin-import): Import with sanity.
- [eslint-plugin-jsx-a11y](https://ghub.io/eslint-plugin-jsx-a11y): Static AST checker for accessibility rules on JSX elements.
- [eslint-plugin-mocha](https://ghub.io/eslint-plugin-mocha): Eslint rules for mocha.
- [eslint-plugin-react](https://ghub.io/eslint-plugin-react): React specific linting rules for ESLint
- [eslint-plugin-simple-import-sort](https://ghub.io/eslint-plugin-simple-import-sort): Easy autofixable import sorting
- [flow-bin](https://ghub.io/flow-bin): Binary wrapper for Flow - A static type checker for JavaScript
- [prettier-eslint](https://ghub.io/prettier-eslint): Formats your JavaScript using prettier followed by eslint --fix
- [mocha](https://ghub.io/mocha): simple, flexible, fun test framework
- [mocha-snapshots](https://ghub.io/mocha-snapshots): Snapshot testing for Mocha users
