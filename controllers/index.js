const { register } = require('./register');
const { findUserInDatabase, checkPassword } = require('./login');

module.exports = {
  register,
  login: {
    findUserInDatabase,
    checkPassword,
  },
};
