import { IBot, IHistory, IStart, IStrategy } from '../interfaces';

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
}
