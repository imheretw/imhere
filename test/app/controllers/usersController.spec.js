import chai from 'chai';
import chaiHttp from 'chai-http';
import factory from 'factory-girl';

import server from 'app';
import { bookshelf } from 'database';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Test users controller', function () {

  before(async () => {
    await bookshelf.knex.migrate.latest();
  });

  beforeEach(async () => {
    await bookshelf.knex.seed.run();
  });

  afterEach(async () => {
    factory.cleanUp();
  });

  describe('GET /api/users', () => {
    beforeEach(async () => {
      await factory.createMany('user', 3);
    });

    it('should return all users', async () => {
      const res = await chai.request(server)
        .get('/api/users');
      const users = res.body.users;
      const pagination = res.body.pagination;
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(users).to.a('array');
      expect(users.length).to.equal(3);
      expect(users).to.have.property('length', 3);
      expect(users[0]).to.have.property('name', 'name1');
      expect(pagination).to.have.property('page', 1);
      expect(pagination).to.have.property('pageSize', 50);
    });
  });

  describe('POST /api/users', () => {
    beforeEach(async() => {
      await bookshelf.knex.seed.run();
      await factory.createMany('user', 3);
    });

    afterEach(async() => {
      factory.cleanUp();
    });

    it('should create a user', async () => {
      let res = await chai.request(server)
        .post('/api/users')
        .send({
          email: 'user1@test.com',
          name: 'A',
          last_name: 'A',
          password: '123',
        });
      expect(res.status).to.equal(201);
    });
  });
});
