import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

const createMatchMock = {
	"homeTeam": 3,
	"awayTeam": 2,
	"homeTeamGoals": 5 ,
	"awayTeamGoals": 3,
	"inProgress": true
}

const sameTeamMatchMock = {
	"homeTeam": 3,
	"awayTeam": 3,
	"homeTeamGoals": 5 ,
	"awayTeamGoals": 3,
	"inProgress": true
}

describe('Testes da rota GET /matches', () => {
  let chaiHttpResponse: Response;

  it('Testa se é recebido um array de objetos com as informações das partidas', async () => {
    chaiHttpResponse = await chai
       .request(app)
			 .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.lengthOf(50)
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
		expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals');
		expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
		expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals');
		expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
		expect(chaiHttpResponse.body[0]).to.have.property('teamHome');
		expect(chaiHttpResponse.body[0]).to.have.property('teamAway');
  });
});

describe('Testes da rota /matches', () => {
  let chaiHttpResponse: Response;

  it('Testa se é recebido um objeto com as informações da partida filtrada', async () => {
    chaiHttpResponse = await chai
       .request(app)
			 .get('/matches/4');
		
		expect(chaiHttpResponse.status).to.be.equal(200);
		expect(chaiHttpResponse.body).to.be.an('object');
		expect(chaiHttpResponse.body).to.have.property('id');
		expect(chaiHttpResponse.body).to.have.property('homeTeam');
		expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
		expect(chaiHttpResponse.body).to.have.property('awayTeam');
		expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
		expect(chaiHttpResponse.body).to.have.property('inProgress');
	});

	it('Testa se é recebido uma mensagem de erro em caso de erro', async () => {
    chaiHttpResponse = await chai
       .request(app)
			 .get('/matches/1000000');
		
		expect(chaiHttpResponse.status).to.be.equal(401);
		expect(chaiHttpResponse.body.message).to.be.equal('Match not found');
	});
});

describe('Testa as requisições POST da rota matches', () => {
  let chaiHttpResponse: Response;
  it('Testa a requisição com as informações corretas de partida', async () => {
    chaiHttpResponse = await chai
		.request(app)
		.post('/match')
		.send(createMatchMock)
		.set('Content-Type', 'application/json')
		.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjUxNzA4OTk3LCJleHAiOjE2NTIzMTM3OTd9.XDPA9_ddpioKQ2LF5iSrhsMRH1odZK3GRGhnQQIzIqw');

    expect(chaiHttpResponse.status).to.be.equal(201);
	});

	it('Testa se é possível criar jogos com o mesmo time', async () => {
		chaiHttpResponse = await chai
		.request(app)
		.post('/match')
		.send(sameTeamMatchMock)
		.set('Content-Type', 'application/json')
		.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjUxNTE3MTY2LCJleHAiOjE2NTIxMjE5NjZ9.DjmdgpYhZBL2cPjB_1Xir1h4WHGnim4Enb1rCRa8WJ4');

		expect(chaiHttpResponse.status).to.be.equal(401);
		expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
	});
});

describe('Testes da rota PATCH /matches/:id/finish', () => {
	let chaiHttpResponse: Response;

	it('Testa se é possível finalizar uma partida', async () => {
		chaiHttpResponse = await chai
		.request(app)
		.patch('/matches/1/finish')

		expect(chaiHttpResponse.status).to.be.equal(200);
	});
})


describe('Testes da rota PATCH /matches/:id', () => {
	let chaiHttpResponse: Response;

	it('Testa se é possível modificar uma partida', async () => {
		chaiHttpResponse = await chai
		.request(app)
		.patch('/matches/1')
		.send({
			homeTeamGoals: 1,
			awayTeamGoals: 2,
		})

		expect(chaiHttpResponse.status).to.be.equal(200);
	});
})