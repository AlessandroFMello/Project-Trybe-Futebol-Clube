import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
describe('Testes da rota GET leaderboard/home', () => {
	let chaiHttpResponse: Response;

	it('Testa se retorna os dados das partidas em casa dos times', async () => {
		chaiHttpResponse = await chai
		.request(app)
		.get('/leaderboard/home')

		expect(chaiHttpResponse.status).to.be.equal(200);
	});
})

describe('Testes da rota GET leaderboard/away', () => {
	let chaiHttpResponse: Response;

	it('Testa se retorna os dados das partidas fora de casa dos times', async () => {
		chaiHttpResponse = await chai
		.request(app)
		.get('/leaderboard/away')

		expect(chaiHttpResponse.status).to.be.equal(200);
	});
})

describe('Testes da rota GET leaderboard', () => {
	let chaiHttpResponse: Response;

	it('Testa se retorna os dados de todas partidas dos times', async () => {
		chaiHttpResponse = await chai
		.request(app)
		.get('/leaderboard')

		expect(chaiHttpResponse.status).to.be.equal(200);
	});
})
