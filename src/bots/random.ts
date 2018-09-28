import { IHistory } from './bot';

export class RandomBot {
	public cooperate = (history: IHistory): boolean => {
		return Math.random() > 0.5;
	};
}
