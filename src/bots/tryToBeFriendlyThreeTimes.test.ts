import * as chai from 'chai';
import { TryToBeFriendlyThreeTimesBot } from './tryToBeFriendlyThreeTimes';
const { expect } = chai;
import { IHistory } from './bot';

describe('bots: tryToBeFriendlyThreeTimes', () => {
	let testObject: TryToBeFriendlyThreeTimesBot;
	beforeEach(() => {
		testObject = new TryToBeFriendlyThreeTimesBot();
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

		test('finks if opponent finked 3 times before', () => {
			const input: IHistory = {
				competitorMoves: [false, false, true, false],
				myMoves: [true, true, true, true],
			};

			const result = testObject.cooperate(input);

			expect(result).to.eql(false);
		});
	});
});
