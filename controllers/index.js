const { register } = require('./register');
const { findUserInDatabase, checkPassword, login } = require('./login');
const { updateSettings } = require('./settings');

module.exports = {
  register,
  login: {
    findUserInDatabase,
    checkPassword,
    login,
  },
  settings: {
    updateSettings,
  },
};
