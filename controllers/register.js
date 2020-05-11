const { log } = require('../utils/logger');

const { UserSchema } = require('../models/schemas/user');
const UserModel = require('mongoose').model('User', UserSchema);

async function register(event) {
  return UserModel.insertMany(event);
}

module.exports = {
  register,
};
