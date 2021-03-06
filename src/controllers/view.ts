import { Request, Response } from 'express';
import { Bot } from '../bots/bot';
import { IStart, IStrategy } from '../interfaces';
import * as validationService from '../services/validation';

export const oneOnOneRoute = (req: Request, res: Response): void => {
	const bot1Start: IStart = validationService.isIStart(req.body.bot1Start) ? req.body.bot1Start : IStart.Random;
	const bot2Start: IStart = validationService.isIStart(req.body.bot2Start) ? req.body.bot2Start : IStart.Random;
	const bot1Strategy: IStrategy = validationService.isIStrategy(req.body.bot1Strategy)
		? req.body.bot1Strategy
		: IStrategy.Random;
	const bot2Strategy: IStrategy = validationService.isIStrategy(req.body.bot2Strategy)
		? req.body.bot2Strategy
		: IStrategy.Random;
	const iterations = req.body.iterations || 1000;

	const bot1 = new Bot(req.body.bot1Name || 'Bot 1', bot1Start, bot1Strategy);
	const bot2 = new Bot(req.body.bot2Name || 'Bot 2', bot2Start, bot2Strategy);

	const results = bot1.battle(bot2, iterations);
	res.render('oneOnOneResult', {
		aName: bot1.name,
		aResult: results.aResult,
		bName: bot2.name,
		bResult: results.bResult,
		bot1Start,
		bot1Strategy,
		bot2Start,
		bot2Strategy,
		iterations,
	});
};
