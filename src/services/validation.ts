import { IStart, IStrategy } from '../interfaces';

export const isIStart = (possible: string): boolean => {
	return Object.values(IStart).some(s => s === (possible as IStart));
};

export const isIStrategy = (possible: string): boolean => {
	return Object.values(IStrategy).some(s => s === (possible as IStrategy));
};
