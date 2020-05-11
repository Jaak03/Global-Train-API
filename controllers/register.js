const mongoose = require('mongoose');

const { UserSchema } = require('../models/schemas/user');
const { createSalt, computeHash } = require('../helpers/auth');

const UserModel = mongoose.model('User', UserSchema);

const { log } = require('../utils/logger');

async function register(event) {
  return UserModel.insertMany(event);
}

module.exports = {
  register,
};
