import * as chai from 'chai';
import * as punishments from '../data/punishments';
import * as testObject from './results';
const { expect } = chai;

describe('services: results', () => {
	describe('calculateResults', () => {
		test('gives both small punishment when they cooperate', () => {
			const result = testObject.calculateResults(true, true);

			expect(result.aResult).to.eql(punishments.reward);
			expect(result.bResult).to.eql(punishments.reward);
		});

		test('gives player A big reward when they fink on B cooperator', () => {
			const result = testObject.calculateResults(false, true);

			expect(result.aResult).to.eql(punishments.temptation);
			expect(result.bResult).to.eql(punishments.sucker);
		});

		test('gives player B big reward when they fink on A cooperator', () => {
			const result = testObject.calculateResults(true, false);

			expect(result.aResult).to.eql(punishments.sucker);
			expect(result.bResult).to.eql(punishments.temptation);
		});

		test('gives both real punishment when they both fink', () => {
			const result = testObject.calculateResults(false, false);

			expect(result.aResult).to.eql(punishments.punishment);
			expect(result.bResult).to.eql(punishments.punishment);
		});
	});
});
