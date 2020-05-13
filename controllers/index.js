const { register } = require('./register');
const { findUserInDatabase, checkPassword, login } = require('./login');

module.exports = {
  register,
  login: {
    findUserInDatabase,
    checkPassword,
    login,
  },
};
