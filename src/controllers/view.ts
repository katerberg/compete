import { Request, Response } from 'express';
import { Bot } from '../bots/bot';
import { IStart, IStrategy } from '../interfaces';

export const oneOnOneRoute = (_req: Request, res: Response): void => {
	const bot1 = new Bot('Random', IStart.Random, IStrategy.Random);
	const bot2 = new Bot('Cooperative', IStart.Friendly, IStrategy.Cooperative);
	const results = bot1.battle(bot2, 1000);
	res.render('oneOnOneResult', {
		aName: bot1.name,
		aResult: results.aResult,
		bName: bot2.name,
		bResult: results.bResult,
	});
};
