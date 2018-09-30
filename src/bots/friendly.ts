import { IBot, IHistory } from '../interfaces';

export class FriendlyBot implements IBot {
	public name = 'Friendly';

	public cooperate = (history: IHistory): boolean => {
		if (!history.myMoves.length) {
			return true;
		}
		const myPreviousMove = history.myMoves[history.myMoves.length - 1];
		const competitorPreviousMove = history.competitorMoves[history.competitorMoves.length - 1];
		return myPreviousMove && competitorPreviousMove;
	};
}
