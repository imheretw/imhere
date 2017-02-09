import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import factory from 'factory-girl';

import server from 'app';
import { bookshelf } from 'database';

chai.use(chaiHttp);

describe('Test users controller', function () {

  before(async () => {
    await bookshelf.knex.migrate.latest();
  });

  beforeEach(async () => {
    await bookshelf.knex.seed.run();
    await factory.createMany('user', 3);
  });

  afterEach(async () => {
    factory.cleanUp();
  });

  describe('GET /api/users', () => {
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
    it('should create a user', async () => {
      let res = await chai.request(server)
        .post('/api/users')
        .send({
          email: 'user4@test.com',
          name: 'A',
          last_name: 'A',
          password: '123',
        });
      expect(res.status).to.equal(201);
    });

    it('should fail to create a user', async () => {
      try {
        await chai.request(server)
          .post('/api/users')
          .send({
            email: 'user1@test.com',
            name: 'A',
            last_name: 'A',
            password: '123',
          });
        assert.fail();
      } catch (error) {
        expect(error.status).to.equal(500);
      }
    });
  });

  describe('POST /api/users/login', () => {
    it('should login successfully', async () => {
      let res = await chai.request(server)
        .post('/api/users/login')
        .send({
          email: 'user1@test.com',
          password: '123',
        });
      expect(res.status).to.equal(200);
    });

    it('should login fail', async () => {
      try {
        await chai.request(server)
          .post('/api/users/login')
          .send({
            email: 'user1@test.com',
            password: 'wrong',
          });
        assert.fail();
      } catch (error) {
        expect(error.status).to.equal(401);
      }
    });
  });
});
