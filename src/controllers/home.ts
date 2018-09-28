import { Request, Response } from 'express';
import { RandomBot } from '../bots/random';
import { runTests } from '../services/results';

export const index = (req: Request, res: Response) => {
	const response = {
		iterationsPerTest: 1,
		losses: 50,
		wins: 50,
	};
	const bot1: RandomBot = new RandomBot();
	const bot2: RandomBot = new RandomBot();
	const results = runTests(1000, bot1.cooperate, bot2.cooperate);
	res.status(200).send(results);
};
