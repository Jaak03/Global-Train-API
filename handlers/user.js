const { register } = require('../controllers/register');

module.exports.register = async function(event) {
  return register(event);
}