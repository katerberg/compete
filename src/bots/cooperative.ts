import { IBot, IHistory } from './bot';

export class CooperativeBot implements IBot {
	public name = 'Cooperative';

	public cooperate = (): boolean => {
		return true;
	};
}
