import { IBot, IHistory } from '../interfaces';

export class TryToBeFriendlyThreeTimesBot implements IBot {
	public name = 'Try to be friendly three times';

	public cooperate = (history: IHistory): boolean => {
		return history.competitorMoves.filter(move => !move).length < 3;
	};
}
