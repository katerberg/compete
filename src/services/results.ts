export interface IResults {
	aResult: number;
	bResult: number;
}

export type ICooperationFn = () => boolean;

export const runTests = (
	numberOfTimes: number,
	aCooperationFn: ICooperationFn,
	bCooperationFn: ICooperationFn
): IResults => {
	let results: IResults = {
		aResult: 0,
		bResult: 0,
	};
	for (let i = 0; i < numberOfTimes; i++) {
		const oneTimeResult = calculateResults(aCooperationFn(), bCooperationFn());
		results = {
			aResult: results.aResult + oneTimeResult.aResult,
			bResult: results.bResult + oneTimeResult.bResult,
		};
	}
	return results;
};

export const calculateResults = (aCooperate: boolean, bCooperate: boolean): IResults => {
	let aResult = 0;
	let bResult = 0;

	if (aCooperate && bCooperate) {
		aResult += 3;
		bResult += 3;
	}
	if (!aCooperate && !bCooperate) {
		aResult += 1;
		bResult += 1;
	}
	if (aCooperate && !bCooperate) {
		bResult += 5;
	}
	if (!aCooperate && bCooperate) {
		aResult += 5;
	}
	return {
		aResult,
		bResult,
	};
};
