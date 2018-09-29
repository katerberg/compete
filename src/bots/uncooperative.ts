import { IBot, IHistory } from './bot';

export class UncooperativeBot implements IBot {
	public name = 'Uncooperative';

	public cooperate = (): boolean => {
		return false;
	};
}
