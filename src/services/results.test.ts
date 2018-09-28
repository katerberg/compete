import { expect } from 'chai';
import * as sinon from 'sinon';
import * as testObject from './results';

describe('services: results', () => {
	describe('calculateResults', () => {
		test('gives both small reward when they cooperate', () => {
			const result = testObject.calculateResults(true, true);

			expect(result.aResult).to.eql(3);
			expect(result.bResult).to.eql(3);
		});

		test('gives player A big reward when they fink on B cooperator', () => {
			const result = testObject.calculateResults(false, true);

			expect(result.aResult).to.eql(5);
			expect(result.bResult).to.eql(0);
		});

		test('gives player B big reward when they fink on A cooperator', () => {
			const result = testObject.calculateResults(true, false);

			expect(result.aResult).to.eql(0);
			expect(result.bResult).to.eql(5);
		});

		test('gives both small reward when they both fink', () => {
			const result = testObject.calculateResults(false, false);

			expect(result.aResult).to.eql(1);
			expect(result.bResult).to.eql(1);
		});
	});

	describe('runTests', () => {
		let mockCalculator: sinon.SinonStub;

		beforeEach(() => {
			mockCalculator = sinon.stub(testObject, 'calculateResults');
		});

		afterEach(() => {
			mockCalculator.restore();
		});

		test('calculates results using cooperation functions', () => {
			const expected: testObject.IResults = {
				aResult: 5678,
				bResult: 9876,
			};
			mockCalculator.returns(expected);

			const result: testObject.IResults = testObject.runTests(1, () => true, () => false);

			expect(result).to.eql(expected);
		});

		test('adds up multiple results', () => {
			const mockResponse: testObject.IResults = {
				aResult: 2,
				bResult: 1,
			};
			mockCalculator.returns(mockResponse);

			const result: testObject.IResults = testObject.runTests(4, () => true, () => false);

			expect(result).to.eql({
				aResult: 8,
				bResult: 4,
			});
		});
	});
});
