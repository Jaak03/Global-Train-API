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
const { register } = require('../controllers/register');

// MODELS
const { UserSchema } = require('../models/schemas/user');

// HELPERS
const { createSalt, computeHash } = require('../helpers/auth');

module.exports = {
  utils: {
    log,
    isRecent,
  },
  helpers: {
    auth: {
      createSalt,
      computeHash,
    },
  },
  controllers: {
    register,
  },
  models: {
    UserModel: mongoose.model('User', UserSchema),
  },
};
