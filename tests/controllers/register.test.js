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
      hash = computeHash(userToRegister.password, salt);
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

    it('should return new user document', () => {
      expect(response[0]).to.have.property('password');
      expect(response[0]).to.have.property('email');
      expect(response[0]).to.have.property('gender');
      expect(response[0]).to.have.property('salt');
    });

    it('should catch duplicate emails', async () => {
      const duplicate = await register(userToRegister);
      console.log(duplicate);
    });
  });

  describe('cleaning up', () => {
    it('deleted test user from database', async () => {
      const dbResponse = await UserModel.deleteMany({
        password: userToRegister.password,
        email: userToRegister.email,
      });

      expect(dbResponse.ok).to.be.equal(1);
    });
  });
});
