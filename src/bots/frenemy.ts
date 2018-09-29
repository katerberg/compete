import { IBot, IHistory } from './bot';

export class FrenemyBot implements IBot {
	public name = 'Frenemy';

	public cooperate = (history: IHistory): boolean => {
		return Math.random() > 0.95 ? false : true;
	};
}
