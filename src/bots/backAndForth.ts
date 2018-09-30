import { IBot, IHistory } from '../interfaces';

export class BackAndForthBot implements IBot {
	public name = 'Back and Forth';

	public cooperate = (history: IHistory): boolean => {
		if (!history.myMoves.length) {
			return Math.random() > 0.5;
		}
		return !history.myMoves[history.myMoves.length - 1];
	};
}
