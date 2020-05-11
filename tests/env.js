// STOCK IMPORTS
const mongoose = require('mongoose');

// ENVIRONMENTAL VARIABLES
require('dotenv')
  .config({ path: `./.env/dev` });

// SETTING UP APPLICATION ENVIRONMENT.
require('../config');

console.log(process.env.MONGO_URI);

// UTILS
const { log, isRecent } = require('../utils/logger');

// CONTROLLERS
const { register } = require('../controllers/register');

// MODELS
const { UserSchema } = require('../models/schemas/user');

module.exports = {
  utils: {
    log,
    isRecent,
  },
  controllers: {
    register,
  },
  models: {
    UserModel: mongoose.model('User', UserSchema)
  }
};
