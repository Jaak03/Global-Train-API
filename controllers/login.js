const mongoose = require('mongoose');

const { UserSchema } = require('../models/schemas/user');

const UserModel = mongoose.model('User', UserSchema);

const { computeHash, createToken } = require('../helpers/auth');
const { wrapForCors } = require('../helpers/response');

const { log } = require('../utils/logger');

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
async function login(event) {
  const body = JSON.parse(event.body);

  log(body);

  try {
    const userDoc = await findUserInDatabase(body.email);
    if (checkPassword(body.password, userDoc)) {
      return wrapForCors({
        token: createToken(userDoc),
        msg: 'Succesfully logged in.',
        user: {
          email: userDoc.email,
          settings: userDoc.settings,
          gender: userDoc.gender,
        },
      });
    }
    return wrapForCors({
      msg: 'Could not log in user for the given credentials.',
    });
  } catch (e) {
    log(e);
    return wrapForCors({
      msg: 'Could not log in user for the given credentials.',
    });
  }
}

module.exports = {
  checkPassword,
  findUserInDatabase,
  login,
};
