const mongoose = require('mongoose');

const session = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
  },
  time: String,
  active: Boolean,
});

const UserSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  email: String,
  password: String,
  salt: String,
  gender: Number,
  settings: {
    sessions: [session],
  },
});

module.exports = {
  UserSchema,
};
