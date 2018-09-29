import * as chai from 'chai';
import { ForgivingBot } from './forgiving';
const { expect } = chai;
import { IHistory } from './bot';

describe('bots: forgiving', () => {
	let testObject: ForgivingBot;
	beforeEach(() => {
		testObject = new ForgivingBot();
	});

	describe('cooperate', () => {
		test('starts friendly', () => {
			const input: IHistory = {
				competitorMoves: [],
				myMoves: [],
			};

			const result = testObject.cooperate(input);

			expect(result).to.eql(true);
		});

		test('is friendly if previous moves have been friendly', () => {
			const input: IHistory = {
				competitorMoves: [true],
				myMoves: [true],
			};

			const result = testObject.cooperate(input);

			expect(result).to.eql(true);
		});

		test('finks if opponent finked in the last 3 moves', () => {
			const input: IHistory = {
				competitorMoves: [false, false, true, true],
				myMoves: [true, false, false, false],
			};

			const result = testObject.cooperate(input);

			expect(result).to.eql(false);
		});

		test('forgives if opponent was nice the last 3 moves', () => {
			const input: IHistory = {
				competitorMoves: [false, true, true, true],
				myMoves: [true, false, false, false],
			};

			const result = testObject.cooperate(input);

			expect(result).to.eql(true);
		});
	});
});
