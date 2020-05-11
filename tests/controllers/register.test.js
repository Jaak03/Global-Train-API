const { expect } = require('chai');

const { controllers: { register } } = require('../env');
const { userToRegister } = require('./args');

describe('user', () => {
  describe('register', () => {
    let response;

    before(async function() {
      this.timeout(5000);
      response = await register(userToRegister);
    });

    it('response should be ok', () => {
      expect(response).to.be.ok;
    });

    it('should return insert user to database', () => {
      console.log(response);
      expect(response).to.have.property('upsert');
    });
  });
});
