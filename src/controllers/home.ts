import { Request, Response } from 'express';
import { BackAndForthBot } from '../bots/backAndForth';
import { Bot } from '../bots/bot';
import { ForgivingBot } from '../bots/forgiving';
import { FrenemyBot } from '../bots/frenemy';
import { FriendlyBot } from '../bots/friendly';
import { TitForTatBot } from '../bots/titForTat';
import { TryToBeFriendlyThreeTimesBot } from '../bots/tryToBeFriendlyThreeTimes';
import { WelcomingTitForTatBot } from '../bots/welcomingTitForTat';
import { IBot, IStart, IStrategy } from '../interfaces';
import { roundRobin, runTests } from '../services/results';

export const oneOnOneRoute = (req: Request, res: Response) => {
	const bot1: IBot = new Bot('Random', IStart.Random, IStrategy.Random);
	const bot2: IBot = new Bot('Cooperative', IStart.Friendly, IStrategy.Cooperative);
	const results = runTests(req.query.iterations || 1000, bot1.cooperate, bot2.cooperate);
	res.status(200).send({
		bot1: results.aResult,
		bot2: results.bResult,
	});
};

export const robinRoute = (req: Request, res: Response) => {
	const bots: IBot[] = [
		new Bot('Random', IStart.Random, IStrategy.Random),
		new Bot('Cooperative', IStart.Friendly, IStrategy.Cooperative),
		new Bot('Uncooperative', IStart.Unfriendly, IStrategy.Uncooperative),
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
