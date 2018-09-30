import { IBot, IHistory } from '../interfaces';

export class CooperativeBot implements IBot {
	public name = 'Cooperative';

	public cooperate = (): boolean => {
		return true;
	};
}
