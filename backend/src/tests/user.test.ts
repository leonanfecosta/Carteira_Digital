import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/user.model';

chai.use(chaiHttp);
const { expect } = chai;

const correctUser = {
  id: 4,
  username: 'correctUser',
  password: '9d3aa98720813362b99c5626db91186c',
  accountId: 4,
};

const correctUserRegister = {
  id: 5,
  username: 'correctUser2',
  password: '9d3aa98720813362b99c5626db91186c',
  accountId: 5,
};


describe('Testa a rota /login', () => {
  describe('Testa o login com usuário correto', () => {
    let stub: sinon.SinonStub;
    before((done) => {
      stub = sinon.stub(User, 'findOne');
      stub.resolves(correctUser as unknown as User);
      done();
    });
    after((done) => {
      (User.findOne as sinon.SinonStub).restore();
      done();
    });

    it('Deve retornar 200', (done) => {
      chai
        .request(app)
        .post('/user/login')
        .send({ username: 'correctUser', password: '123456Ab' })
        .end((err: Error, res: Response) =>
          expect(res.status).to.be.equal(200)
        );
      done();
    });
  });

  describe('Testa o login com usuário incorreto', () => {
    let stub: sinon.SinonStub;
    before((done) => {
      stub = sinon.stub(User, 'findOne');
      stub.resolves(null);
      done();
    });
    after((done) => {
      (User.findOne as sinon.SinonStub).restore();
      done();
    });

    it('Deve retornar 401 se o usuário nao for encontrado', (done) => {
      chai
        .request(app)
        .post('/user/login')
        .send({ username: 'incorrectUser', password: '123456Ab' })
        .end((err: Error, res: Response) => {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('User not found');
        });
      done();
    });
  });
  describe('Testa o login com senha incorreta', () => {
    let stub: sinon.SinonStub;
    before((done) => {
      stub = sinon.stub(User, 'findOne');
      stub.resolves(correctUser as unknown as User);
      done();
    });
    after((done) => {
      (User.findOne as sinon.SinonStub).restore();
      done();
    });

    it('Deve retornar 400 se a senha estiver incorreta', (done) => {
      chai
        .request(app)
        .post('/user/login')
        .send({ username: 'correctUser', password: '123456Abc' })
        .end((err: Error, res: Response) => {
          expect(res.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('Invalid password');
        });
      done();
    });
  });
});

describe('Testa a rota /register', () => {
  describe('Testa o registro com usuário correto', () => {
    let stub: sinon.SinonStub;
    before(() => {
      stub = sinon.stub(User, 'create');
      stub.resolves(correctUserRegister as unknown as User);
    });
    after(() => {
      (User.create as sinon.SinonStub).restore();
    });
    it('Deve retornar 201', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send({ username: 'correctUser2', password: '123456Ab' })
        .end((err: Error, res: Response) => {
          expect(res.status).to.be.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('username');
          expect(res.body).to.have.property('accountId');
        });
      done();
    });
  });

  describe('Testa o registro com usuário já existente', () => {
    let stub: sinon.SinonStub;
    before(() => {
      stub = sinon.stub(User, 'findOne');
      stub.resolves(correctUserRegister as unknown as User);
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Deve retornar 409', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send({ username: 'correctUser', password: '123456Ab' })
        .end((err: Error, res: Response) => {
          expect(res.status).to.be.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('Username already exists');
        });
      done();
    });
  });

  describe('Testa o registro com um username menor do que 3 caracteres', () => {
    it('Deve retornar 400', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send({ username: 'ab', password: '123456Ab' })
        .end((err: Error, res: Response) => {
          expect(res.status).to.be.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal(
            'Username must be at least 3 characters long'
          );
        });
      done();
    });
  });

  describe('Testa o registro com um password sem as regras necessárias', () => {
    it('Deve retornar 400', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send({ username: 'correctUser', password: '123456a' })
        .end((err: Error, res: Response) => {
          expect(res.status).to.be.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal(
            'Password must contain at least 8 characters, one uppercase, one lowercase and one number'
          );
        });
      done();
    });
  });
});

