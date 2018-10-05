export interface IBotResult {
	name: string;
	result: number;
}

export interface IResults {
	aResult: number;
	bResult: number;
}

export type ICooperationFn = (history?: IHistory) => boolean;

export interface IHistory {
	competitorMoves: boolean[];
	myMoves: boolean[];
}

export interface IBot {
	name: string;
	battle: (bot: IBot, numberOfTimes: number) => IResults;
	cooperate: (history: IHistory) => boolean;
}

export enum IStart {
	Friendly = 'FRIENDLY',
	Random = 'RANDOM',
	Unfriendly = 'UNFRIENDLY',
}

export enum IStrategy {
	Cooperative = 'COOPERATIVE',
	Random = 'RANDOM',
	TitForTat = 'TITFORTAT',
	Uncooperative = 'UNCOOPERATIVE',
	BackAndForth = 'BACKANDFORTH',
	Friendly = 'FRIENDLY',
	Baseball = 'BASEBALL',
}
