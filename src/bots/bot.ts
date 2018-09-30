import { IBot, IHistory, IStart } from '../interfaces';

export class Bot implements IBot {
	public name: string;
	public start: IStart;

	constructor(name: string, start: IStart) {
		this.name = name;
		this.start = start;
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
		return Math.random() > 0.5;
	};
}
