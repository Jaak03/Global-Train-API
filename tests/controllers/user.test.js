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
  models: {
    UserModel,
  },
} = require('../env');

const { userToRegister } = require('./args');

describe('user', () => {
  let salt;
  let hash;

  before(() => {
    salt = createSalt();
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
      hash = computeHash(userToRegister.password, salt);
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

    it('should return new user email', () => {
      expect(response).to.have.property('email');
    });

    it('should return success message', () => {
      expect(response.msg).to.equal('Successfully registered new user.');
    });

    it('should catch duplicate emails', async () => {
      const dbResponse = await register(userToRegister);
      expect(dbResponse.msg).to.equal('That email is already linked to an account.');
    });
  });

  describe('login', () => {
    let user;
    before(() => {
      user = 'tets';
    });
  });

  describe('cleaning up', () => {
    it('deleted test user from database', async () => {
      const dbResponse = await UserModel.deleteMany({
        email: userToRegister.email,
      });

      expect(dbResponse.ok).to.be.equal(1);
    });
  });
});
