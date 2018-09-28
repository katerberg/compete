export interface IHistory {
	competitorMoves: boolean[];
	myMoves: boolean[];
}

export interface IBot {
	cooperate: (history: IHistory) => boolean;
}
