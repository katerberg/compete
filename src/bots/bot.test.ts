import * as chai from 'chai';
import { mockRandom } from 'jest-mock-random';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { IHistory, IStart, IStrategy } from '../interfaces';
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
		});
	});
});
