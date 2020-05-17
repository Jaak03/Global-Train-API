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
 * Update the settings of the user.
 * @param {object} event Object for the http request. Decode token in Authorization header to find
 * user email to update.
 */
async function updateSettings(event) {
  return wrapForCors(event);
}

module.exports = {
  checkPassword,
  findUserInDatabase,
  updateSettings,
};
