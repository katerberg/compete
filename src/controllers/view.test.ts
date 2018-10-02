import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as testObject from './view';
chai.use(sinonChai);

const { expect } = chai;

describe('view controller', () => {
	describe('oneOnOne', () => {
		test('returns results of bots', () => {
			const render = sinon.stub();
			const req: any = {}; // tslint:disable-line
			const res: any = { render }; // tslint:disable-line

			testObject.oneOnOneRoute(req, res);

			expect(render.callCount).to.eql(1);
		});
	});
});
