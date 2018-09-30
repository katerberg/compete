import { IBot, IHistory } from '../interfaces';

export class WelcomingTitForTatBot implements IBot {
	public name = 'Welcoming Tit For Tat';

	public cooperate = (history: IHistory): boolean => {
		if (!history.competitorMoves.length) {
			return true;
		}
		return history.competitorMoves[history.competitorMoves.length - 1];
	};
}
