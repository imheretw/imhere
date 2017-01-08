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
