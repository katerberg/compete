import { IBot, IHistory } from '../interfaces';

export class UncooperativeBot implements IBot {
	public name = 'Uncooperative';

	public cooperate = (): boolean => {
		return false;
	};
}
