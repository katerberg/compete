import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as punishments from '../data/punishments';
import * as testObject from './results';
chai.use(sinonChai);
const { expect } = chai;
import { IHistory } from '../bots/bot';

describe('services: results', () => {
	describe('calculateResults', () => {
		test('gives both small punishment when they cooperate', () => {
			const result = testObject.calculateResults(true, true);

			expect(result.aResult).to.eql(punishments.minor);
			expect(result.bResult).to.eql(punishments.minor);
		});

		test('gives player A big reward when they fink on B cooperator', () => {
			const result = testObject.calculateResults(false, true);

			expect(result.aResult).to.eql(punishments.narc);
			expect(result.bResult).to.eql(punishments.soldOut);
		});

		test('gives player B big reward when they fink on A cooperator', () => {
			const result = testObject.calculateResults(true, false);

			expect(result.aResult).to.eql(punishments.soldOut);
			expect(result.bResult).to.eql(punishments.narc);
		});

		test('gives both real punishment when they both fink', () => {
			const result = testObject.calculateResults(false, false);

			expect(result.aResult).to.eql(punishments.regular);
			expect(result.bResult).to.eql(punishments.regular);
		});
	});

	describe('runTests', () => {
		let mockCalculator: sinon.SinonStub;

		beforeEach(() => {
			mockCalculator = sinon.stub(testObject, 'calculateResults');
		});

		afterEach(() => {
			mockCalculator.restore();
		});

		test('calculates results using cooperation functions', () => {
			const expected: testObject.IResults = {
				aResult: 5678,
				bResult: 9876,
			};
			mockCalculator.returns(expected);

			const result: testObject.IResults = testObject.runTests(1, () => true, () => false);

			expect(result).to.eql(expected);
		});

		test('adds up multiple results', () => {
			const mockResponse: testObject.IResults = {
				aResult: 2,
				bResult: 1,
			};
			mockCalculator.returns(mockResponse);

			const result: testObject.IResults = testObject.runTests(4, () => true, () => false);

			expect(result).to.eql({
				aResult: 8,
				bResult: 4,
			});
		});

		test('builds up and passes history', () => {
			const mockResponse: testObject.IResults = {
				aResult: 2,
				bResult: 1,
			};
			mockCalculator.returns(mockResponse);
			let aCount = 0;
			let bCount = 0;
			const aFn: sinon.SinonStub = sinon.stub().callsFake((history: IHistory) => {
				aCount++;
				if (aCount === 1) {
					expect(history.competitorMoves).to.eql([]);
					expect(history.myMoves).to.eql([]);
				} else {
					expect(history.competitorMoves).to.eql([false]);
					expect(history.myMoves).to.eql([true]);
				}
				return true;
			});
			const bFn: sinon.SinonStub = sinon.stub().callsFake((history: IHistory) => {
				bCount++;
				if (bCount === 1) {
					expect(history.competitorMoves).to.eql([]);
					expect(history.myMoves).to.eql([]);
				} else {
					expect(history.competitorMoves).to.eql([true]);
					expect(history.myMoves).to.eql([false]);
				}
				return false;
			});

			const result: testObject.IResults = testObject.runTests(2, aFn, bFn);

			expect(aFn.callCount).to.equal(2);
			expect(bFn.callCount).to.equal(2);
		});
	});
});
