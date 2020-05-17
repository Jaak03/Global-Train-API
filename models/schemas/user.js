const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  email: String,
  password: String,
  salt: String,
  gender: Number,
  settings: {
    sessions: Object,
  },
});

module.exports = {
  UserSchema,
};
