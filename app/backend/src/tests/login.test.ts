import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  id: 1,
	username: "Admin",
	role: "admin",
	email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

describe('Testa a rota de login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        ...userMock,
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Testa a requisição com as informações corretas de usuário', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "admin@admin.com",
        "password": "secret_admin"
       })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
  });

  it('Testa a requisição com email incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "user@user.com",
        "password": "secret_admin"
        })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.be.equal('Incorrect email or password');
  });

  it('Testa a requisição com senha incorreta', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "admin@admin.com",
        "password": "secret_admin_wrong"
        })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.be.equal('Incorrect email or password');
  });

  it('Testa a requisição sem informar email', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "password": "secret_admin"
        })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.be.equal('All fields must be filled');
  });

  it('Testa a requisição sem informar senha', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "admin@admin.com",
        })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.be.equal('All fields must be filled');
  });

  it('Testa a requisição sem informar email e senha', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.be.equal('All fields must be filled');
  });

  it('Testa a rota login/validate', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/validate').set('authorization', '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjUxNTE3MTY2LCJleHAiOjE2NTIxMjE5NjZ9.DjmdgpYhZBL2cPjB_1Xir1h4WHGnim4Enb1rCRa8WJ4')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal('admin');
  })
});
