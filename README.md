# ImHere ![CircleCI Build Status](https://circleci.com/gh/imheretw/imhere.svg?style=shield&circle-token=86e04f476d21b9b2164053879588dc4e676fc520)

We integrated most popular and widely used packages for web development.
Node.js web developer is now easily to start developing web application in minutes just like other web frameworks such as Laravel, Rails ...etc.

# Integrated Features

* ES Lint & JSCS for code style checking
* Support ES7 async/await (babel)
* MVC architecture
  * router (express.js)
  * controllers (express.js)
  * ORM (Bookshelf.js)
* Configuration Settings (dotenv)
* User Authentication
  * jwt
  * passport
* Logger (winston)
* Database schema migration (knex.js)
* Unit Test Integrations
  * mocha: javascript testing framework
  * chai: BDD/TDD assertion
  * factory-girl: db data generation for test
  * sinon: stub & mock for unit test
  * nock: web mock
* Live Reload For Development
* Debugger (node-inspector)
* Support Background Jobs (Kue.js)

# Prerequisite
  - redis 3.0+
  - mysql 5.6+
  - Node 6+

# Install


```shell
> npm install -g yarn
> npm install -g bower
```

```
> yarn
> bower i
```

# Up and Running
```
> yarn start
yarn start v0.18.1
$ gulp serve
[19:25:50] Requiring external module babel-register
[19:25:50] Using gulpfile ~/projects/nodejs/imhere/gulpfile.babel.js
[19:25:51] Starting 'styles'...
[19:25:51] Starting 'images'...
[19:25:51] Starting 'attachments'...
[19:25:51] Starting 'lint:scripts'...
[19:25:51] Starting 'files'...
[19:25:51] Starting 'fonts'...
....
2017-01-08T11:25:54.207Z - info: listening on port 5000
```

# Available Commands
* **`yarn start`** starting web server on local machine.
* testing
  * **`yarn test`** run testcases with sqlite
  * **`yarn test:debug`** run testcase with sqlite and more debug logs
  * **`yarn test:mysql`** run testcase with mysql
  * **`yarn test:mysql:debug`** run testcase with mysql and more debug logs
* database
  * **`yarn db:create`** create database
  * **`yarn db:drop`** drop database
  * **`yarn db:migrate`** run database schema migration
  * **`yarn db:rollback`** rollback last schema migration
  * **`yarn db:seed`** generate seed data into database
