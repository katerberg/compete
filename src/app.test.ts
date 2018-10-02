import * as request from 'supertest';
import app from './app';

describe('GET /random-url', () => {
	it('should return 404', done => {
		request(app)
			.get('/blah')
			.expect(404, done);
	});
});

describe('GET /home', () => {
	it('should return 200', done => {
		request(app)
			.get('/')
			.expect(200, done);
	});
});

describe('GET /robin', () => {
	it('should return 200', done => {
		request(app)
			.get('/robin')
			.expect(200, done);
	});
});
