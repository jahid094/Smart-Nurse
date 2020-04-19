const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const moment = require('moment')
const passport = require('passport');
const jwt = require('jsonwebtoken')
var async = require('async');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");
// Load User model
const User = require('../models/User');
// const { checkUserSession } = require('../app.js')
const { forwardAuthenticated } = require('../config/auth');

const pass = require('../config/keys').GMAILPW;

// Registration 
router.post('/register', (req, res) => {
  const {firstname, lastname, gender, age, email, password, password2, phone, height, weight, userType} = req.body
  let newUser
  if (!firstname || !lastname || !gender || !age || !email || !password || !password2 || !phone || !height || !weight || !userType ) {
    return res.status(400).json({
      message: 'Please enter all fields'
    }) 
  }

  if (password != password2) {
    return res.status(400).json({
      message: 'Passwords do not match'
    }) 
  }

  if(age<0){
    return res.status(400).json({
      message: 'Age should not be negetive'
    })
  }

  if(height < 0 || weight <0 ){
    return res.status(400).json({
      message: 'Height or Weight should not be negetive'
    })
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters'
    })
  }
    
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({
        message: 'Email already exists'
      })
    } else {
      newUser = new User({firstname, lastname, gender, age, email, password, phone, height, weight, userType})

      const Token = jwt.sign({ firstname , lastname , email } , process.env.JWT_SECRET)
      newUser.conformationToken = Token
      newUser.conformationExpires = Date.now() + 3600000

      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'codebreakers8094@gmail.com',
          pass: pass
        }
      });
      var mailOptions = {
        to: req.body.email,
        from: 'codebreakers8094@gmail.com',
        subject: 'Confirm Your mail',
        text: 'You are receiving this because you (or someone else) have requested to create account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/conformation/' + Token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) {
            throw err
          } 
          newUser.password = hash;
            try{
                await newUser.save()
                return res.status(200).json({
                  newUser,
                  message: 'An varification-mail has been sent to ' + newUser.email + ' . Please verify !'
                })
            }catch(e){
                return res.status(400).json({
                  message: e
                })
            }
          })
        })
      }
    })
})

// Login
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const {email, password} = req.body
  User.findOne({email} , (err, user) => {
    if (!user) {
      return res.status(400).json({
        message: 'No account is associated with this email'
      })
    }
    if(user.varify === true){
        let isValidPassword = false

        isValidPassword =  bcrypt.compare(password, user.password).then(() => {
          isValidPassword = true
        }).catch((error) => {
          return res.status(400).json({
            message: 'Could not log you in, please check your credentials and try again.'
          })
        })
        if(isValidPassword){
          return res.status(200).json({
            message: 'Login Successful.'
          })
        }
        else{
          return res.status(400).json({
            message: 'Invalid credentials, could not log you in.'
          })
        }
    }
    else{
      /* req.flash('error_msg', 'Please authenticate first !');
      res.redirect('/login'); */
      return res.status(400).json({
        message: 'Please verify your email to login.'
      })
    }
  })
})

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.status(200).json({
    message: 'You are logged out.'
  })
});


router.post('/forgot', function(req, res, next) {
  const {email} = req.body
  async.waterfall([
    function(done) {
      User.findOne({ email }, function(err, user) {
        if (!user) {
          return res.status(400).json({
            message: 'No account with that email address exists..'
          })
        }
        const token = jwt.sign({_id: user._id } , process.env.JWT_SECRET)

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'codebreakers8094@gmail.com',
          pass: pass
        }
      });
      var mailOptions = {
        to: email,
        from: 'codebreakers8094@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, 'done');
        return res.status(200).json({
          token,
          message: 'An e-mail has been sent to ' + email + ' with further instructions.'
        })
      });
      
    }
  ], function(err) {
    if (err) return next(err);
  });
});


router.post('/reset/:token', function(req, res) {
  const {password, confirm} = req.body
  async.waterfall([
    function(done) {
      User.findOne({ 
        resetPasswordToken: req.params.token, 
        resetPasswordExpires: { 
          $gt: Date.now() 
        } 
      }, (err, user) => {
        if (!user) {
          return res.status(400).json({
            message: 'Password reset token is invalid or has expired.'
          })
          /* req.flash('error_msg', 'Password reset token is invalid or has expired. inside post');
          return res.redirect('back'); */
        }
        if(password === confirm) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
              if (err) throw err;
              user.password = hash;
              try{
                  await user.save()
                  return res.status(200).json({
                    message: 'Password updated successfully.'
                  })
              }catch(e){
                return res.status(400).json({
                  message: e
                })
              }
            });
          });
        } else {
          return res.status(400).json({
            message: 'Passwords do not match.'
          })
          /* req.flash("error_msg", "Passwords do not match.");
            return res.redirect('back'); */
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'codebreakers8094@gmail.com',
          pass: pass
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'codebreakers8094@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        // req.flash('success_msg', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/login');
  });
});


User.find({varify: false }).then((user) =>{
  user.forEach((element) => {
    var expire = moment(new Date()).isSameOrBefore(element.conformationExpires)
    console.log(element.name)
    console.log(moment(new Date()).isSameOrBefore(element.conformationExpires))
    if(!expire){
      User.deleteOne(element).then((user) =>{
        console.log(element.name , ' deleted')

      }).catch((e) =>{
        console.log(e)
      })
    }
  })
})
  
//Registration Verify
router.get('/conformation/:token', (req, res) => {
  User.findOne({ 
    conformationToken: req.params.token, 
    conformationExpires: { $gt: Date.now() } 
  }, (err, user) => {
    if (!user) {
      return res.status(400).json({
        message: 'This link has been expired , Please register again !'
      })
    }
    user.varify=true
    user.save()
    return res.status(200).json({
      message: 'You are verified , Now you can login!'
    })  
  });
})

module.exports = router;