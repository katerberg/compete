import { Request, Response } from 'express';
import { BackAndForthBot } from '../bots/backAndForth';
import { IBot } from '../bots/bot';
import { CooperativeBot } from '../bots/cooperative';
import { ForgivingBot } from '../bots/forgiving';
import { FrenemyBot } from '../bots/frenemy';
import { FriendlyBot } from '../bots/friendly';
import { RandomBot } from '../bots/random';
import { TitForTatBot } from '../bots/titForTat';
import { TryToBeFriendlyThreeTimesBot } from '../bots/tryToBeFriendlyThreeTimes';
import { UncooperativeBot } from '../bots/uncooperative';
import { WelcomingTitForTatBot } from '../bots/welcomingTitForTat';
import { roundRobin, runTests } from '../services/results';

export const oneOnOneRoute = (req: Request, res: Response) => {
	const bot1: IBot = new RandomBot();
	const bot2: IBot = new CooperativeBot();
	const results = runTests(req.query.iterations || 1000, bot1.cooperate, bot2.cooperate);
	res.status(200).send({
		bot1: results.aResult,
		bot2: results.bResult,
	});
};

export const robinRoute = (req: Request, res: Response) => {
	const bots: IBot[] = [
		new RandomBot(),
		new CooperativeBot(),
		new UncooperativeBot(),
		new WelcomingTitForTatBot(),
		new TitForTatBot(),
		new BackAndForthBot(),
		new FriendlyBot(),
		new TryToBeFriendlyThreeTimesBot(),
		new FrenemyBot(),
		new ForgivingBot(),
	];
	const iterations = req.query.iterations || 1000;
	const results = roundRobin(iterations, bots);
	res.status(200).send(results.sort((a, b) => (a.result > b.result ? -1 : 1)));
};
