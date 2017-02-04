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
* Commands (commander)
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
* Deployment
  * Capistrano (Ruby gem)
  * pm2 (Production process manager for Node.js)

# Prerequisite
  - redis 3.0+
  - mysql 5.6+
  - Node 6+
  - Ruby 2.0+ (For deploy)

# Install

## Environment

Startup services
```shell
> docker-compose up -d
Creating imhere_redis_1
Creating imhere_mysql_1
Creating imhere_phpmyadmin_1
```

Install tools
```shell
> npm install -g yarn
> npm install -g bower
> npm install -g bable-cli # for commands
> npm install -g pm2 # for deployment environment
> gem install bundler # for capistrano to deploy
> bundle install # for capistrano to deploy
```

Install npm and bower packages
```
> yarn
> bower i
```

## Config

Copy `.env.sample` to `.env` and change the setting
```shell
> cp .env.sample .env
```

## Prepare for database

Migration
```shell
> yarn db:create
> yarn db:migrate
```

Seed
```shell
> yarn db:seed
```

# Up and Running

Start the service
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

Test sample API
```json
> curl http://localhost:5000/api/users

{
  "users": [
    {
      "id": 1,
      "name": "Test",
      "email": "test@test.com",
      "encrypted_password": "$2a$06$NkYh0RCM8pNWPaYvRLgN9.Tl30VHCXEDh66RKnuDJNBV0RLQSypWa",
      "created_at": "2017-02-04T08:33:18.000Z",
      "updated_at": "2017-02-04T08:33:18.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "rowCount": 1,
    "pageCount": 1
  }
}
```

Kue page: http://localhost:5000/kue

![kue](https://cloud.githubusercontent.com/assets/1978357/22617555/34ee1780-eb03-11e6-998d-01557f517763.png)

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
* custom commands
  * **`yarn command:job:my`** run sample job
* deployment
  * **`cap localhost deploy`** deploy to localhost
  * **`cap dev deploy`** deploy to dev server
  * **`cap staging deploy`** deploy to staging server
  * **`cap production deploy`** deploy to production server
