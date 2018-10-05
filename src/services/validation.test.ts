import * as chai from 'chai';
import { IStart, IStrategy } from '../interfaces';
import * as testObject from './validation';
const { expect } = chai;

describe('services: validation', () => {
	describe('isIStart', () => {
		test('gives true if item is in IStart', () => {
			const result = testObject.isIStart(IStart.Random);

			expect(result).to.equal(true);
		});

		test('gives true if item is in IStart', () => {
			const result = testObject.isIStart('not in list');

			expect(result).to.equal(false);
		});
	});

	describe('isIStrategy', () => {
		test('gives true if item is in IStrategy', () => {
			const result = testObject.isIStrategy(IStrategy.Random);

			expect(result).to.equal(true);
		});

		test('gives true if item is in IStrategy', () => {
			const result = testObject.isIStrategy('not in list');

			expect(result).to.equal(false);
		});
	});
});
