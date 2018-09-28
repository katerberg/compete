import { IBot, IHistory } from './bot';

export class RandomBot implements IBot {
	public cooperate = (): boolean => {
		return Math.random() > 0.5;
	};
}
