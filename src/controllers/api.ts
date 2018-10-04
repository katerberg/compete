import { Request, Response } from 'express';
import { Bot } from '../bots/bot';
import { ForgivingBot } from '../bots/forgiving';
import { IBot, IStart, IStrategy } from '../interfaces';
import { roundRobin, runTests } from '../services/results';

export const oneOnOneRoute = (req: Request, res: Response) => {
	const bot1: IBot = new Bot('Random', IStart.Random, IStrategy.Random);
	const bot2: IBot = new Bot('Cooperative', IStart.Friendly, IStrategy.Cooperative);
	const results = runTests(req.query.iterations || 1000, bot1, bot2);
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
		new Bot('Welcoming Tit For Tat', IStart.Friendly, IStrategy.TitForTat),
		new Bot('Tit For Tat', IStart.Random, IStrategy.TitForTat),
		new Bot('Back And Forth', IStart.Random, IStrategy.BackAndForth),
		new Bot('Friendly', IStart.Friendly, IStrategy.Friendly),
		new Bot('Baseball', IStart.Friendly, IStrategy.Baseball),
		new Bot('Frenemy', IStart.Friendly, IStrategy.Friendly, 0.05),
		new ForgivingBot(),
	];
	const iterations = req.query.iterations || 1000;
	const results = roundRobin(iterations, bots);
	res.status(200).send(results.sort((a, b) => (a.result > b.result ? -1 : 1)));
};
