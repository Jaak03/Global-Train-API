/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { UserSchema } = require('../models/schemas/user');

const UserModel = mongoose.model('User', UserSchema);

const { decodeAndVerifyToken } = require('../helpers/auth');
const { wrapForCors } = require('../helpers/response');

const { log } = require('../utils/logger');

async function updateUserSettings(body, settings) {
  const response = await UserModel.findOneAndUpdate(
    { email: body.email },
    {
      $set: {
        settings,
      },
    },
    {
      new: true,
    },
  );
  log({ body, response });
  if (String(response._id) === String(body._id)) {
    return 'Successfully updated user settings.';
  }
  return 'Could not update user settings.';
}

/**
 * Update the settings of the user.
 * @param {object} event Object for the http request. Decode token in Authorization header to find
 * user email to update.
 */
async function updateSettings(event) {
  const auth = decodeAndVerifyToken(event.headers.Authorization);

  const body = JSON.parse(event.body);
  const { settings = null } = body || { settings: null };

  if (!settings) return wrapForCors({ msg: 'Could not read settings from request.' });

  if (auth) {
    const response = await updateUserSettings(auth, settings);
    return wrapForCors(response);
  }

  return wrapForCors({ msg: 'Invalid token.' });
}

module.exports = {
  updateSettings,
};
