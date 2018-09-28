import { Request, Response } from 'express';
import { IBot } from '../bots/bot';
import { CooperativeBot } from '../bots/cooperative';
import { RandomBot } from '../bots/random';
import { runTests } from '../services/results';

export const index = (req: Request, res: Response) => {
	const bot1: IBot = new RandomBot();
	const bot2: IBot = new CooperativeBot();
	const results = runTests(10000, bot1.cooperate, bot2.cooperate);
	res.status(200).send({
		bot1: results.aResult,
		bot2: results.bResult,
	});
};
