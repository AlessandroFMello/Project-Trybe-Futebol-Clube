import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
	{
		"id": 4,
		"teamName": "Corinthians"
	},
	{
		"id": 5,
		"teamName": "Cruzeiro"
	},
	{
		"id": 6,
		"teamName": "Ferroviária"
	},
	{
		"id": 7,
		"teamName": "Flamengo"
	},
	{
		"id": 8,
		"teamName": "Grêmio"
	},
	{
		"id": 9,
		"teamName": "Internacional"
	},
	{
		"id": 10,
		"teamName": "Minas Brasília"
	},
	{
		"id": 11,
		"teamName": "Napoli-SC"
	},
	{
		"id": 12,
		"teamName": "Palmeiras"
	},
	{
		"id": 13,
		"teamName": "Real Brasília"
	},
	{
		"id": 14,
		"teamName": "Santos"
	},
	{
		"id": 15,
		"teamName": "São José-SP"
	},
	{
		"id": 16,
		"teamName": "São Paulo"
	},
];

const teamByIdMock = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
};

const emptyMock = [];

describe('Testes da rota /teams', () => {
  let chaiHttpResponse: Response;

  it('Testa se é recebido um array de objetos com as informações dos times', async () => {
    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves({
          ...teamsMock,
        } as Team[]);
    });
  
    chaiHttpResponse = await chai
       .request(app).get('/teams');
    
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.lengthOf(16);
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
  });
});

describe('Testes da rota /teams/:id', () => {
  let chaiHttpResponse: Response;

  it('Testa se é recebido um objeto com as informações do time filtrado', async () => {
    before(async () => {
      sinon
        .stub(Team, "findOne")
        .resolves({
          ...teamByIdMock,
        } as Team);
    });
  
    chaiHttpResponse = await chai
       .request(app).get('/teams/1');
    
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });

  it('Testa se é recebida uma mensagem de erro em caso de erro', async () => {
    before(async () => {
      sinon
        .stub(Team, "findOne")
        .resolves({
          ...teamByIdMock,
        } as Team);
    });
  
    chaiHttpResponse = await chai
       .request(app).get('/teams/924');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Team not found');
  });
});