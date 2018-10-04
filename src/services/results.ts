import * as punishments from '../data/punishments';
import { IBot, IBotResult, IHistory, IResults } from '../interfaces';

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
				const oneOnOne = runTests(numberOfTimes, bots[i], bots[j]);
				results[i].result += oneOnOne.aResult;
				results[j].result += oneOnOne.bResult;
			}
		}
	}
	return results;
};

export const runTests = (numberOfTimes: number, aBot: IBot, bBot: IBot): IResults => {
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
		const aChoice = aBot.cooperate(aHistory);
		const bChoice = bBot.cooperate(bHistory);
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
	let aResult = punishments.temptation;
	let bResult = punishments.temptation;

	if (aCooperate) {
		if (bCooperate) {
			aResult = punishments.reward;
			bResult = punishments.reward;
		} else {
			aResult = punishments.sucker;
		}
	} else {
		if (bCooperate) {
			bResult = punishments.sucker;
		} else {
			aResult = punishments.punishment;
			bResult = punishments.punishment;
		}
	}
	return {
		aResult,
		bResult,
	};
};
