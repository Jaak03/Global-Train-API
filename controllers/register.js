const mongoose = require('mongoose');

const { UserSchema } = require('../models/schemas/user');
const { createSalt, computeHash } = require('../helpers/auth');

const UserModel = mongoose.model('User', UserSchema);

async function register(user) {
  try {
    const newUser = user;

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
    return {
      msg: 'Successfully registered new user.',
      email: user.email,
    };
  } catch (e) {
    if (e.code === 11000) {
      return {
        msg: 'That email is already linked to an account.',
      };
    }

    return {
      msg: 'Could not register new user.',
    };
  }
}

module.exports = {
  register,
};
