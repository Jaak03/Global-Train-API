/* eslint-disable no-undef */
const { expect } = require('chai');
const moment = require('moment');

const {
  utils: {
    isRecent
  },
} = require('../env');

describe('logger', () => {
  describe('isRecent', () => {
    before('add log to process variables', () => {
      process.env.log = true;
    });
    it('return true if date is recent', () => {
      process.env.logDate = moment().format('YYYY-MM-DD');
      expect(isRecent(moment().toISOString())).to.be.true;
    });
    it('return false if date is not recent', () => {
      process.env.logDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
      expect(isRecent(moment().subtract(5, 'hour').toISOString())).to.be.false;
    });
  });
});