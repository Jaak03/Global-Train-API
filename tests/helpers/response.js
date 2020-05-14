const { expect } = require('chai');

const { partial } = require('./args');

const {
  helpers: {
    response: {
      wrapForCors,
    },
  },
} = require('../env');

const {} = require('../')

describe('response', () => {
  describe('wrapForCors', () => {
    it('response should be ok', () => {
      const response = wrapForCors(partial);
      
    });
  });
});