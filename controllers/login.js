const mongoose = require('mongoose');

const { UserSchema } = require('../models/schemas/user');

const UserModel = mongoose.model('User', UserSchema);

const { computeHash, createToken } = require('../helpers/auth');

async function findUserInDatabase(email) {
  return UserModel.findOne(
    { email },
  );
}

/**
 * Encrypt and check whether the password entered by the user matches.
 * @param {string} attemptedPassword String password that was entered by user.
 * @param {object} userAuth User document that matches the email from user.
 */
function checkPassword(attemptedPassword, userAuth) {
  // Check that passwords are not null and match
  if (attemptedPassword
    && userAuth.password
    && userAuth.salt
    && (userAuth.password === computeHash(attemptedPassword, userAuth.salt))
  ) {
    return true;
  }
  return false;
}

/**
 * Login functino to combine the login process.
 * @param {object} user Object that containts the login attempt password and email.
 */
async function login(user) {
  const userDoc = await findUserInDatabase(user.email);
  if (checkPassword(user.password, userDoc)) {
    return {
      token: createToken(userDoc),
      msg: 'Succesfully logged in.',
    };
  }
  return {
    msg: 'Could not log in user for the given credentials.',
  };
}

module.exports = {
  checkPassword,
  findUserInDatabase,
  login,
};
