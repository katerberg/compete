import { Request, Response } from 'express';
import { Bot } from '../bots/bot';
import { IStart, IStrategy } from '../interfaces';
import { runTests } from '../services/results';

export const oneOnOneRoute = (_req: Request, res: Response): void => {
	const bot1 = new Bot('Random', IStart.Random, IStrategy.Random);
	const bot2 = new Bot('Cooperative', IStart.Friendly, IStrategy.Cooperative);
	const results = runTests(1000, bot1, bot2);
	res.render('oneOnOneResult', {
		aName: bot1.name,
		aResult: results.aResult,
		bName: bot2.name,
		bResult: results.bResult,
	});
};
