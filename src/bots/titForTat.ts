import { IBot, IHistory } from '../interfaces';

export class TitForTatBot implements IBot {
	public name = 'Tit For Tat';

	public cooperate = (history: IHistory): boolean => {
		if (!history.competitorMoves.length) {
			return Math.random() > 0.5;
		}
		return history.competitorMoves[history.competitorMoves.length - 1];
	};
}
