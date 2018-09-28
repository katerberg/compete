import { Request, Response } from 'express';
import { IBot } from '../bots/bot';
import { CooperativeBot } from '../bots/cooperative';
import { RandomBot } from '../bots/random';
import { TitForTatBot } from '../bots/titForTat';
import { UncooperativeBot } from '../bots/uncooperative';
import { roundRobin, runTests } from '../services/results';

export const oneOnOneRoute = (req: Request, res: Response) => {
	const bot1: IBot = new RandomBot();
	const bot2: IBot = new CooperativeBot();
	const results = runTests(req.query.iterations || 10000, bot1.cooperate, bot2.cooperate);
	res.status(200).send({
		bot1: results.aResult,
		bot2: results.bResult,
	});
};

export const robinRoute = (req: Request, res: Response) => {
	const bots: IBot[] = [new RandomBot(), new CooperativeBot(), new UncooperativeBot(), new TitForTatBot()];
	const iterations = req.query.iterations || 10000;

	res.status(200).send(roundRobin(iterations, bots));
};
