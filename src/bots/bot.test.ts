import * as chai from 'chai';
import { mockRandom } from 'jest-mock-random';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { IBot, ICooperationFn, IHistory, IResults, IStart, IStrategy } from '../interfaces';
import * as results from '../services/results';
import { Bot } from './bot';

chai.use(sinonChai);
const { expect } = chai;

describe('bots: bot', () => {
	describe('cooperate', () => {
		describe('start', () => {
			test('starts friendly if given that choice', () => {
				const input: IHistory = {
					competitorMoves: [],
					myMoves: [],
				};
				const testObject = new Bot('test', IStart.Friendly, IStrategy.Random);

				const result = testObject.cooperate(input);

				expect(result).to.eql(true);
			});

			test('starts unfriendly if given that choice', () => {
				const input: IHistory = {
					competitorMoves: [],
					myMoves: [],
				};
				const testObject = new Bot('test', IStart.Unfriendly, IStrategy.Random);

				const result = testObject.cooperate(input);

				expect(result).to.eql(false);
			});

			test('with random, cooperates on greater than 0.5', () => {
				const input: IHistory = {
					competitorMoves: [],
					myMoves: [],
				};
				const testObject = new Bot('test', IStart.Random, IStrategy.Random);
				mockRandom(0.51);

				const result = testObject.cooperate(input);

				expect(result).to.eql(true);
			});

			test('with random, finks on less or equal to 0.5', () => {
				const input: IHistory = {
					competitorMoves: [],
					myMoves: [],
				};
				mockRandom([0.5]);
				const testObject = new Bot('test', IStart.Random, IStrategy.Random);

				const result = testObject.cooperate(input);

				expect(result).to.eql(false);
			});
		});

		describe('nonstart', () => {
			describe('random', () => {
				test('cooperates on greater than 0.5', () => {
					const input: IHistory = {
						competitorMoves: [true],
						myMoves: [true],
					};
					const testObject = new Bot('test', IStart.Random, IStrategy.Random);
					mockRandom([0.51]);

					const result = testObject.cooperate(input);

					expect(result).to.eql(true);
				});

				test('finks on less or equal to 0.5', () => {
					const input: IHistory = {
						competitorMoves: [true],
						myMoves: [true],
					};
					mockRandom([0.5]);
					const testObject = new Bot('test', IStart.Random, IStrategy.Random);

					const result = testObject.cooperate(input);

					expect(result).to.eql(false);
				});
			});

			test('cooperative cooperates', () => {
				const input: IHistory = {
					competitorMoves: [true],
					myMoves: [true],
				};
				const testObject = new Bot('test', IStart.Random, IStrategy.Cooperative);

				const result = testObject.cooperate(input);

				expect(result).to.eql(true);
			});

			test('uncooperative finks', () => {
				const input: IHistory = {
					competitorMoves: [true],
					myMoves: [true],
				};
				const testObject = new Bot('test', IStart.Random, IStrategy.Uncooperative);

				const result = testObject.cooperate(input);

				expect(result).to.eql(false);
			});

			test('titForTat gives last move of competitor', () => {
				const previousMove = true;
				const input: IHistory = {
					competitorMoves: [previousMove],
					myMoves: [false],
				};
				const testObject = new Bot('test', IStart.Random, IStrategy.TitForTat);

				const result = testObject.cooperate(input);

				expect(result).to.eql(previousMove);
			});

			describe('back and forth', () => {
				test('gives true when it gave false last time', () => {
					const input: IHistory = {
						competitorMoves: [true],
						myMoves: [false],
					};
					const testObject = new Bot('test', IStart.Random, IStrategy.BackAndForth);

					const result = testObject.cooperate(input);

					expect(result).to.eql(true);
				});

				test('gives false when it gave true last time', () => {
					const input: IHistory = {
						competitorMoves: [true],
						myMoves: [true],
					};
					const testObject = new Bot('test', IStart.Random, IStrategy.BackAndForth);

					const result = testObject.cooperate(input);

					expect(result).to.eql(false);
				});
			});

			describe('friendly', () => {
				test('is friendly if previous moves have been friendly', () => {
					const input: IHistory = {
						competitorMoves: [true],
						myMoves: [true],
					};
					const testObject = new Bot('test', IStart.Random, IStrategy.Friendly);

					const result = testObject.cooperate(input);

					expect(result).to.eql(true);
				});

				test('finks if opponent finked before', () => {
					const input: IHistory = {
						competitorMoves: [false],
						myMoves: [true],
					};
					const testObject = new Bot('test', IStart.Random, IStrategy.Friendly);

					const result = testObject.cooperate(input);

					expect(result).to.eql(false);
				});

				test('finks if opponent ever finked before', () => {
					const input: IHistory = {
						competitorMoves: [false, true],
						myMoves: [true, false],
					};
					const testObject = new Bot('test', IStart.Random, IStrategy.Friendly);

					const result = testObject.cooperate(input);

					expect(result).to.eql(false);
				});
			});

			describe('baseball', () => {
				test('is friendly if previous moves have been friendly', () => {
					const input: IHistory = {
						competitorMoves: [true],
						myMoves: [true],
					};
					const testObject = new Bot('test', IStart.Random, IStrategy.Baseball);

					const result = testObject.cooperate(input);

					expect(result).to.eql(true);
				});

				test('finks if opponent finked 3 times before', () => {
					const input: IHistory = {
						competitorMoves: [false, false, true, false],
						myMoves: [true, true, true, true],
					};
					const testObject = new Bot('test', IStart.Random, IStrategy.Baseball);

					const result = testObject.cooperate(input);

					expect(result).to.eql(false);
				});
			});
		});
	});

	describe('battle', () => {
		let mockCalculator: sinon.SinonStub;
		let botBuilder: (cooperationFn: ICooperationFn) => IBot;

		beforeEach(() => {
			mockCalculator = sinon.stub(results, 'calculateResults');
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
			const testObject = botBuilder(() => true);

			const result: IResults = testObject.battle(botBuilder(() => false), 1);

			expect(result).to.eql(expected);
		});

		test('adds up multiple results', () => {
			const mockResponse: IResults = {
				aResult: 2,
				bResult: 1,
			};
			mockCalculator.returns(mockResponse);
			const testObject = botBuilder(() => true);

			const result: IResults = testObject.battle(botBuilder(() => false), 4);

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
			const testObject = botBuilder(aFn);

			testObject.battle(botBuilder(bFn), 2);

			expect(aFn.callCount).to.equal(2);
			expect(bFn.callCount).to.equal(2);
		});
	});
});
