/* eslint-disable no-underscore-dangle */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const keys = require('../.env/keys');

const { log } = require('../utils/logger');

const EXPIRATION_PERIOD_IN_DAYS = 7;

function createSalt() {
  return crypto.randomBytes(32).toString('hex').toUpperCase();
}

function computeHash(password, salt) {
  const key = `${salt}${password}`;
  const hash = crypto.createHash('sha512').update(key, 'binary').digest('hex').toUpperCase();
  return hash;
}

function decodeAndVerifyToken(token) {
  const payload = jwt.verify(token, keys.public);
  if (moment(payload.exp * 1000).isAfter(moment())) {
    return {
      _id: payload._id,
      email: payload.email,
      gender: payload.gender,
      settings: payload.settings,
    };
  }
  return 0;
}

const signOptions = {
  issuer: 'amazonaws.com',
  subject: 'Global-Train',
  audience: 'https://dj0yz8ziq0.execute-api.us-east-1.amazonaws.com',
  expiresIn: 1000 * 60 * 60 * 24 * EXPIRATION_PERIOD_IN_DAYS,
  algorithm: 'RS256',
};

function createToken(user) {
  const { _id, email, gender } = user;
  return jwt.sign({
    _id,
    email,
    gender,
  }, keys.private, signOptions);
}


module.exports = {
  createSalt,
  computeHash,
  createToken,
  signOptions,
  decodeAndVerifyToken,
};
