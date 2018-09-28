export interface IHistory {
	competitorMoves: boolean[];
	myMoves: boolean[];
}

export interface IBot {
	name: string;
	cooperate: (history: IHistory) => boolean;
}
