import * as punishments from '../data/punishments';
import { IBot, IBotResult, IResults } from '../interfaces';

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
				const oneOnOne = bots[i].battle(bots[j], numberOfTimes);
				results[i].result += oneOnOne.aResult;
				results[j].result += oneOnOne.bResult;
			}
		}
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
