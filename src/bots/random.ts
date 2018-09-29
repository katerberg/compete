import { IBot, IHistory } from './bot';

export class RandomBot implements IBot {
	public name = 'Random';

	public cooperate = (): boolean => {
		return Math.random() > 0.5;
	};
}
