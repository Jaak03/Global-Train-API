'use strict';

const { log } = require('./utils/logger');

const { hello } = require('./handlers/hello');
const { register } = require('./handlers/user');

// Connection to the database.
require('./config');

log('Starting up handlers.');

module.exports = {
  hello,
  register,
};
