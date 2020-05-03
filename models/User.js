const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if(!validator.isAlphanumeric(value)){
        throw new Error('First Name should not be Alphanumeric')
      }
    }
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if(!validator.isAlphanumeric(value)){
        throw new Error('Last Name should not be Alphanumeric')
      }
    }
  },
  gender: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isAlphanumeric(value)){
        throw new Error('Gender should not be Alphanumeric')
      }
    }
  },
  age: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if(!validator.isInt(value)){
        throw new Error('Age should not be fractional')
      }
      if(value < 0){
        throw new Error('Age should not be negetive')
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
        if(!validator.isEmail(value)){
          throw new Error('Email is invalid')
        }
      }
    },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value){
        if(value.toLowerCase().includes('password')){
          throw new Error('Password can not contain "password"')
        }
      }
    },
  phone: {
    type: String,
    trim: true,
    required: true,
    validate(value){
      if(!validator.isNumeric(value)){
        throw new Error('Please enter valid number')
      }
   }
  },
  height: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isFloat(value)){
        throw new Error('Height should not be Alphanumeric')
      }
      if(value < 0){
        throw new Error('Height should not be negetive')
      }
    }
  },
  weight: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isNumeric(value)){
        throw new Error('Weight should not be Alphanumeric')
      }
      if(value < 0){
        throw new Error('Weight should not be negetive')
      }
    }
  },
  userType: {
    type: String,
    required: true
  },

  varify: {
    type: Boolean,
    default: false 
  },
  conformationToken: {
    type: String
  },
  conformationExpires: {
    type: Date
  },
  cookieToken: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date
  },
  profilePicture:{
    type: Buffer
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;