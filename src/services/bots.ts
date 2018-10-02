import { IBot, IResults } from '../interfaces';
import { runTests } from './results';

export const challenge = (numberOfTimes: number, botA: IBot, botB): IResults => {
	return runTests(numberOfTimes, botA.cooperate, botB.cooperate);
};
