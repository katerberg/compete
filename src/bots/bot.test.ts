import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { IHistory, IStart } from '../interfaces';
import { Bot } from './bot';
chai.use(sinonChai);
const { expect } = chai;

describe('bots: bot', () => {
	describe('cooperate', () => {
		let mockRandom: sinon.SinonStub;

		beforeEach(() => {
			mockRandom = sinon.stub(Math, 'random');
		});

		afterEach(() => {
			mockRandom.restore();
		});

		describe('start', () => {
			test('starts friendly if given that choice', () => {
				const input: IHistory = {
					competitorMoves: [],
					myMoves: [],
				};
				const testObject = new Bot('test', IStart.Friendly);

				const result = testObject.cooperate(input);

				expect(result).to.eql(true);
			});

			test('starts unfriendly if given that choice', () => {
				const input: IHistory = {
					competitorMoves: [],
					myMoves: [],
				};
				const testObject = new Bot('test', IStart.Unfriendly);

				const result = testObject.cooperate(input);

				expect(result).to.eql(false);
			});

			test('with random, cooperates on greater than 0.5', () => {
				const input: IHistory = {
					competitorMoves: [],
					myMoves: [],
				};
				const expected = 0.51;
				const testObject = new Bot('test', IStart.Random);
				mockRandom.returns(expected);

				const result = testObject.cooperate(input);

				expect(result).to.eql(true);
			});

			test('with random, finks on less or equal to 0.5', () => {
				const input: IHistory = {
					competitorMoves: [],
					myMoves: [],
				};
				const expected = 0.5;
				mockRandom.returns(expected);
				const testObject = new Bot('test', IStart.Random);

				const result = testObject.cooperate(input);

				expect(result).to.eql(false);
			});
		});

		describe('nonstart', () => {
			test('cooperates on greater than 0.5', () => {
				const input: IHistory = {
					competitorMoves: [true],
					myMoves: [true],
				};
				const expected = 0.51;
				const testObject = new Bot('test', IStart.Random);
				mockRandom.returns(expected);

				const result = testObject.cooperate(input);

				expect(result).to.eql(true);
			});

			test('finks on less or equal to 0.5', () => {
				const input: IHistory = {
					competitorMoves: [true],
					myMoves: [true],
				};
				const expected = 0.5;
				mockRandom.returns(expected);
				const testObject = new Bot('test', IStart.Random);

				const result = testObject.cooperate(input);

				expect(result).to.eql(false);
			});
		});
	});
});
