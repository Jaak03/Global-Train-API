const mongoose = require('mongoose');

const { wrapForCors } = require('../helpers/response');

const { UserSchema } = require('../models/schemas/user');
const { createSalt, computeHash } = require('../helpers/auth');

const { log } = require('../utils/logger');

const UserModel = mongoose.model('User', UserSchema);

async function register(event) {
  try {
    const body = JSON.parse(event.body);

    log(JSON.stringify(body, null, 2));

    body.salt = createSalt();
    body.password = computeHash(body.password, body.salt);
    await UserModel.insertMany({
      password: body.password,
      salt: body.salt,
      email: body.email,
      gender: body.gender,
      age: body.age,
      settings: {
        sessions: [
          {
            id: 0,
            time: '06:00:00',
            active: false,
          },
          {
            id: 1,
            time: '08:00:00',
            active: false,
          },
          {
            id: 2,
            time: '18:00:00',
            active: false,
          },
          {
            id: 3,
            time: '20:00:00',
            active: false,
          },
        ],
      },
    });

    return wrapForCors({
      msg: 'Successfully registered new user.',
      email: body.email,
    });
  } catch (e) {
    if (e.code === 11000) {
      return wrapForCors({
        msg: 'That email is already linked to an account.',
      });
    }

    log(e.stack);
    return wrapForCors({
      msg: 'Could not register new user.',
    });
  }
}

module.exports = {
  register,
};
