import { IHistory } from '../interfaces';
import { Bot } from './bot';

export class ForgivingBot extends Bot {
	constructor() {
		super('Forgiving', null, null);
	}

	public cooperate = (history: IHistory): boolean => {
		if (!history.competitorMoves.length) {
			return true;
		}
		const theirLastMove = history.competitorMoves[history.competitorMoves.length - 1];
		const theirSecondToLastMove = history.competitorMoves[history.competitorMoves.length - 2];
		const theirThirdToLastMove = history.competitorMoves[history.competitorMoves.length - 3];
		return [theirLastMove, theirSecondToLastMove, theirThirdToLastMove].every(m => m === undefined || m);
	};
}
