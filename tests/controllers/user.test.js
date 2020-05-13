/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');

const {
  controllers: {
    register,
    login: {
      checkPassword,
      findUserInDatabase,
      login,
    },
  },
  helpers: {
    auth: {
      createSalt,
      computeHash,
      createToken,
    },
  },
  models: {
    UserModel,
  },
} = require('../env');

const { userToRegister, validLoginDetails } = require('./args');

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
    let user;

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

  describe('findUserInDatabase', () => {
    it('find user based on email', async () => {
      user = await findUserInDatabase(userToRegister.email);
      expect(user).to.have.property('_id');
    });
  });

  describe('createToken', () => {
    let token;
    before(() => {
      token = createToken(user);
    });

    it('token should be ok', () => {
      expect(token).to.be.ok;
    });

    it('token should be string', () => {
      expect(typeof token).to.equal('string');
    });
  });

  describe('checkPassword', () => {
    it('expect a boolean response', () => {
      const response = checkPassword();
      expect(typeof response).to.equal('boolean');
    });

    it('expect a wrong password attempt to return false', () => {
      const response = checkPassword('wrong', user);
      expect(response).to.be.false;
    });

    it('expect a correct password attempt to return true', () => {
      const response = checkPassword('234982hruhwfkjwer123', user);
      expect(response).to.be.true;
    });
  });

  describe('login', () => {
    it('successfully login valid user', async () => {
      const response = await login(validLoginDetails);
      expect(response.msg).to.equal('Succesfully logged in.');
      expect(response).to.have.property('token');
    });

    it('failed to login user for invalid credentials', async () => {
      const response = await login({
        email: validLoginDetails.email,
        password: 'wrong',
      });
      expect(response.msg).to.equal('Could not log in user for the given credentials.');
      expect(response).to.not.have.property('token');
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
