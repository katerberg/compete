import * as chai from 'chai';
import { FriendlyBot } from './friendly';
const { expect } = chai;
import { IHistory } from './bot';

describe('bots: friendly', () => {
	let testObject: FriendlyBot;
	beforeEach(() => {
		testObject = new FriendlyBot();
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

		test('finks if opponent finked before', () => {
			const input: IHistory = {
				competitorMoves: [false],
				myMoves: [true],
			};

			const result = testObject.cooperate(input);

			expect(result).to.eql(false);
		});

		test('finks if opponent ever finked before', () => {
			const input: IHistory = {
				competitorMoves: [false, true],
				myMoves: [true, false],
			};

			const result = testObject.cooperate(input);

			expect(result).to.eql(false);
		});
	});
});
