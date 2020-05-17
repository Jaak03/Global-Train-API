// STOCK IMPORTS
const mongoose = require('mongoose');

// ENVIRONMENTAL VARIABLES
require('dotenv')
  .config({ path: './.env/dev' });

// SETTING UP APPLICATION ENVIRONMENT.
require('../config');

// UTILS
const { log, isRecent } = require('../utils/logger');

// CONTROLLERS
const {
  register,
  login: {
    findUserInDatabase,
    checkPassword,
    login,
  },
} = require('../controllers');

// MODELS
const { UserSchema } = require('../models/schemas/user');

// HELPERS
const { createSalt, computeHash, createToken, decodeAndVerifyToken } = require('../helpers/auth');
const { wrapForCors } = require('../helpers/response');

module.exports = {
  utils: {
    log,
    isRecent,
  },
  helpers: {
    auth: {
      createSalt,
      computeHash,
      createToken,
      decodeAndVerifyToken,
    },
    response: {
      wrapForCors,
    },
  },
  controllers: {
    register,
    login: {
      findUserInDatabase,
      checkPassword,
      login,
    },
  },
  models: {
    UserModel: mongoose.model('User', UserSchema),
  },
};
