const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  varify: {
    type: Boolean ,
    default: false 
  },
  conformationToken: {
    type: String
  },
  conformationExpires: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
      type: Date,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
