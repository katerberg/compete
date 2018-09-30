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
	cooperate: (history: IHistory) => boolean;
}