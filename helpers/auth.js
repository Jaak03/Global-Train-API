const crypto = require('crypto');

function createSalt() {
  return crypto.randomBytes(32).toString('hex').toUpperCase();
}

function computeHash(password, salt) {
  const key = `${salt}${password}`;
  const hash = crypto.createHash('sha512').update(key, 'binary').digest('hex').toUpperCase();
  return hash;
}

module.exports = {
  createSalt,
  computeHash,
};
