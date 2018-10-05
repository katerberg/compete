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
			const req: any = { body: {} }; // tslint:disable-line
			const res: any = { render }; // tslint:disable-line

			testObject.oneOnOneRoute(req, res);

			expect(render.callCount).to.eql(1);
		});

		test('uses passed in bots', () => {
			const render = sinon.stub();
			const req: any = { body: { bot1Name: 'Cooperative', bot2Name: 'Uncooperative' } }; // tslint:disable-line
			const res: any = { render }; // tslint:disable-line

			testObject.oneOnOneRoute(req, res);
			const result = render.getCall(0).args[1];

			expect(result.aName).to.eql('Cooperative');
			expect(result.bName).to.eql('Uncooperative');
		});
	});
});
