import { IBot, IHistory, IStart, IStrategy } from '../interfaces';

export class Bot implements IBot {
	public name: string;
	public start: IStart;
	public strategy: IStrategy;

	constructor(name: string, start: IStart, strategy: IStrategy) {
		this.name = name;
		this.start = start;
		this.strategy = strategy;
	}

	public cooperate = (history: IHistory): boolean => {
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
		}
	};
}
