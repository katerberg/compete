import { IBot, IHistory } from './bot';

export class CooperativeBot implements IBot {
	public name = 'cooperative';

	public cooperate = (): boolean => {
		return true;
	};
}
