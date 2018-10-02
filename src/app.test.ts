import * as request from 'supertest';
import app from './app';

describe('GET /random-url', () => {
	it('should return 404', done => {
		request(app)
			.get('/blah')
			.expect(404, done);
	});
});

describe('GET /api', () => {
	it('should return 200', done => {
		request(app)
			.get('/api')
			.expect(200, done);
	});
});

describe('GET /api/robin', () => {
	it('should return 200', done => {
		request(app)
			.get('/api/robin')
			.expect(200, done);
	});
});
