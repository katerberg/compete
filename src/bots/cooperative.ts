import { IBot, IHistory } from './bot';

export class CooperativeBot implements IBot {
	public cooperate = (): boolean => {
		return true;
	};
}
