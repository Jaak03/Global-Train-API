const mongoose = require('mongoose');

const { wrapForCors } = require('../helpers/response');

const { UserSchema } = require('../models/schemas/user');
const { createSalt, computeHash } = require('../helpers/auth');

const UserModel = mongoose.model('User', UserSchema);

async function register(event) {
  try {
    const newUser = event.body;

    newUser.salt = createSalt();
    newUser.password = computeHash(newUser.password, newUser.salt);
    await UserModel.insertMany({
      password: newUser.password,
      salt: newUser.salt,
      email: newUser.email,
      gender: newUser.gender,
      settings: {
        sessions: [],
      },
    });

    return wrapForCors({
      msg: 'Successfully registered new user.',
      email: newUser.email,
    });
  } catch (e) {
    if (e.code === 11000) {
      return wrapForCors({
        msg: 'That email is already linked to an account.',
      });
    }

    return wrapForCors({
      msg: 'Could not register new user.',
    });
  }
}

module.exports = {
  register,
};
