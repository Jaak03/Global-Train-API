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
const { createSalt, computeHash, createToken } = require('../helpers/auth');

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
