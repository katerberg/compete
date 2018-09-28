import { IBot, IHistory } from '../bots/bot';

export interface IBotResult {
	name: string;
	result: number;
}

export interface IResults {
	aResult: number;
	bResult: number;
}

export type ICooperationFn = (history?: IHistory) => boolean;

export const roundRobin = (numberOfTimes: number, bots: IBot[]): IBotResult[] => {
	const results: IBotResult[] = [];
	for (let i = 0; i < bots.length; i++) {
		results[i] = {
			name: bots[i].name,
			result: 0,
		};
	}
	for (let i = 0; i < bots.length; i++) {
		for (let j = 0; j < bots.length; j++) {
			if (i !== j && j > i) {
				const oneOnOne = runTests(numberOfTimes, bots[i].cooperate, bots[j].cooperate);
				results[i].result += oneOnOne.aResult;
				results[j].result += oneOnOne.bResult;
			}
		}
	}
	return results;
};

export const runTests = (
	numberOfTimes: number,
	aCooperationFn: ICooperationFn,
	bCooperationFn: ICooperationFn
): IResults => {
	const results = {
		aResult: 0,
		bResult: 0,
	};
	const aHistory: IHistory = {
		competitorMoves: [],
		myMoves: [],
	};
	const bHistory: IHistory = {
		competitorMoves: [],
		myMoves: [],
	};
	for (let i = 0; i < numberOfTimes; i++) {
		const aChoice = aCooperationFn(aHistory);
		const bChoice = bCooperationFn(bHistory);
		aHistory.myMoves.push(aChoice);
		aHistory.competitorMoves.push(bChoice);
		bHistory.myMoves.push(bChoice);
		bHistory.competitorMoves.push(aChoice);
		const oneTimeResult = calculateResults(aChoice, bChoice);
		results.aResult = results.aResult + oneTimeResult.aResult;
		results.bResult = results.bResult + oneTimeResult.bResult;
	}
	return results;
};

export const calculateResults = (aCooperate: boolean, bCooperate: boolean): IResults => {
	let aResult = 0;
	let bResult = 0;

	if (aCooperate && bCooperate) {
		aResult += 3;
		bResult += 3;
	}
	if (!aCooperate && !bCooperate) {
		aResult += 1;
		bResult += 1;
	}
	if (aCooperate && !bCooperate) {
		bResult += 5;
	}
	if (!aCooperate && bCooperate) {
		aResult += 5;
	}
	return {
		aResult,
		bResult,
	};
};
