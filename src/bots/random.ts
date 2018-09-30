import { IBot, IHistory } from '../interfaces';

export class RandomBot implements IBot {
	public name = 'Random';

	public cooperate = (): boolean => {
		return Math.random() > 0.5;
	};
}
