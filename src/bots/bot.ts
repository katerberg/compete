import { IBot, IHistory, IResults, IStart, IStrategy } from '../interfaces';
import * as resultsService from '../services/results';

export class Bot implements IBot {
	public name: string;
	public defectChance: number;
	public start: IStart;
	public strategy: IStrategy;

	constructor(name: string, start: IStart, strategy: IStrategy, defectChance?: number) {
		this.name = name;
		this.start = start;
		this.strategy = strategy;
		this.defectChance = defectChance;
	}

	public cooperate = (history: IHistory): boolean => {
		if (this.defectChance && Math.random() < this.defectChance) {
			return false;
		}
		if (!history.myMoves.length) {
			switch (this.start) {
				case IStart.Friendly:
					return true;
				case IStart.Unfriendly:
					return false;
				case IStart.Random:
					return Math.random() > 0.5;
			}
		}
		switch (this.strategy) {
			case IStrategy.Cooperative:
				return true;
			case IStrategy.Uncooperative:
				return false;
			case IStrategy.Random:
				return Math.random() > 0.5;
			case IStrategy.TitForTat:
				return history.competitorMoves[history.competitorMoves.length - 1];
			case IStrategy.BackAndForth:
				return !history.myMoves[history.myMoves.length - 1];
			case IStrategy.Friendly:
				const myPreviousMove = history.myMoves[history.myMoves.length - 1];
				const competitorPreviousMove = history.competitorMoves[history.competitorMoves.length - 1];
				return myPreviousMove && competitorPreviousMove;
			case IStrategy.Baseball:
				return history.competitorMoves.filter(move => !move).length < 3;
		}
	};

	public battle = (bot: IBot, numberOfTimes: number): IResults => {
		const results = {
			aResult: 0,
			bResult: 0,
		};
		const aHistory: IHistory = {
			competitorMoves: [],
			myMoves: [],
		};
		const bHistory: IHistory = {
			competitorMoves: [],
			myMoves: [],
		};
		for (let i = 0; i < numberOfTimes; i++) {
			const aChoice = this.cooperate(aHistory);
			const bChoice = bot.cooperate(bHistory);
			aHistory.myMoves.push(aChoice);
			aHistory.competitorMoves.push(bChoice);
			bHistory.myMoves.push(bChoice);
			bHistory.competitorMoves.push(aChoice);
			const oneTimeResult = resultsService.calculateResults(aChoice, bChoice);
			results.aResult = results.aResult + oneTimeResult.aResult;
			results.bResult = results.bResult + oneTimeResult.bResult;
		}
		return results;
	};
}
