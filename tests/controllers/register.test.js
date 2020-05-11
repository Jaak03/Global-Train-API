/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');

const {
  controllers: {
    register,
  },
  helpers: {
    auth: {
      createSalt,
      computeHash,
    },
  },
} = require('../env');

const { userToRegister } = require('./args');

describe('user', () => {
  let salt;
  let hash;

  before(() => {
    salt = createSalt();
    userToRegister.salt = salt;
  });

  describe('createSalt', () => {
    it('expect a string response', () => {
      expect(typeof salt).to.equal('string');
    });

    it('expect string length to be 64', () => {
      const { length } = String(salt);
      expect(length).to.equal(64);
    });
  });

  describe('computeHash', () => {
    before(() => {
      hash = computeHash(password, salt);
      userToRegister.password = hash;
    });

    it('expect a string response', () => {
      expect(typeof hash).to.equal('string');
    });
  });

  describe('register', () => {
    let response;

    before(async function () {
      this.timeout(5000);
      response = await register(userToRegister);
    });

    it('response should be ok', () => {
      expect(response).to.be.ok;
    });

    it('should return insert user to database', () => {
      expect(response).to.have.property('upsert');
    });
  });
});
