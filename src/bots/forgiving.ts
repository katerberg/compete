import { IBot, IHistory } from '../interfaces';

export class ForgivingBot implements IBot {
	public name = 'Forgiving';

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
