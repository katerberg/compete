import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { Bot } from '../bots/bot';
import * as punishments from '../data/punishments';
import { IBot, ICooperationFn, IHistory, IResults } from '../interfaces';
import * as testObject from './results';
chai.use(sinonChai);
const { expect } = chai;

describe('services: results', () => {
	describe('calculateResults', () => {
		test('gives both small punishment when they cooperate', () => {
			const result = testObject.calculateResults(true, true);

			expect(result.aResult).to.eql(punishments.reward);
			expect(result.bResult).to.eql(punishments.reward);
		});

		test('gives player A big reward when they fink on B cooperator', () => {
			const result = testObject.calculateResults(false, true);

			expect(result.aResult).to.eql(punishments.temptation);
			expect(result.bResult).to.eql(punishments.sucker);
		});

		test('gives player B big reward when they fink on A cooperator', () => {
			const result = testObject.calculateResults(true, false);

			expect(result.aResult).to.eql(punishments.sucker);
			expect(result.bResult).to.eql(punishments.temptation);
		});

		test('gives both real punishment when they both fink', () => {
			const result = testObject.calculateResults(false, false);

			expect(result.aResult).to.eql(punishments.punishment);
			expect(result.bResult).to.eql(punishments.punishment);
		});
	});

	describe('runTests', () => {
		let mockCalculator: sinon.SinonStub;
		let botBuilder: (cooperationFn: ICooperationFn) => IBot;

		beforeEach(() => {
			mockCalculator = sinon.stub(testObject, 'calculateResults');
			botBuilder = cooperationFn => {
				const bot = new Bot('aTest', null, null);
				bot.cooperate = cooperationFn;
				return bot;
			};
		});

		afterEach(() => {
			mockCalculator.restore();
		});

		test('calculates results using cooperation functions', () => {
			const expected: IResults = {
				aResult: 5678,
				bResult: 9876,
			};
			mockCalculator.returns(expected);

			const result: IResults = testObject.runTests(1, botBuilder(() => true), botBuilder(() => false));

			expect(result).to.eql(expected);
		});

		test('adds up multiple results', () => {
			const mockResponse: IResults = {
				aResult: 2,
				bResult: 1,
			};
			mockCalculator.returns(mockResponse);

			const result: IResults = testObject.runTests(4, botBuilder(() => true), botBuilder(() => false));

			expect(result).to.eql({
				aResult: 8,
				bResult: 4,
			});
		});

		test('builds up and passes history', () => {
			const mockResponse: IResults = {
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

			testObject.runTests(2, botBuilder(aFn), botBuilder(bFn));

			expect(aFn.callCount).to.equal(2);
			expect(bFn.callCount).to.equal(2);
		});
	});
});
