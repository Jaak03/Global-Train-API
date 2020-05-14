const { expect } = require('chai');

const { partial } = require('./args');

const {
  helpers: {
    response: {
      wrapForCors,
    },
  },
} = require('../env');

describe('response', () => {
  describe('wrapForCors', () => {
    it('response should be ok', () => {
      const response = wrapForCors(partial);
      expect(response).to.be.ok;
    });

    it('should have added properties', () => {
      const response = wrapForCors(partial);
      expect(response).to.have.property('statusCode');
      expect(response).to.have.property('headers');
      expect(response).to.have.property('body');
    });
  });
});