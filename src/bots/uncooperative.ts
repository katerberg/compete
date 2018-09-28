import { IBot, IHistory } from './bot';

export class UncooperativeBot implements IBot {
	public name = 'uncooperative';

	public cooperate = (): boolean => {
		return false;
	};
}
