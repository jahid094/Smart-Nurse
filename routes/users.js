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
const { forwardAuthenticated } = require('../config/auth');

const pass = require('../config/keys').GMAILPW;

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const {name, email, password, password2} = req.body
  let errors = []
  let newUser
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        newUser = new User({
          name,
          email,
          password
        });

        const Token = jwt.sign({ name , email } , process.env.JWT_SECRET)
        newUser.conformationToken = Token
        newUser.conformationExpires = Date.now() + 3600000
        // newUser.resetPasswordToken = null
        console.log(Date.now())

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
          console.log('mail sent');
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            // newUser.resetPasswordToken = "" 

            try{
                await newUser.save()
                req.flash('success_msg', 'An varification-mail has been sent to ' + req.body.email + ' . Please varify !');
                res.redirect('/login');

            }catch(e){
                console.log("NewUser")
                console.log(newUser)
                console.log(e)
            }
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {

  User.findOne({email: req.body.email } , function(err, user) {
    if (!user) {
      req.flash('error_msg', 'There is no email exists !');
      return res.redirect('/login');
    }
    //console.log(req.body.email)
    console.log(user.email)
    console.log(user.varify)
    if(user.varify === true){
      passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
    }
    else{
      req.flash('error_msg', 'Please authenticate first !');
      res.redirect('/login');
  
    }

  });




});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});


// forgot password
router.get('/forgot', function(req, res) {
  res.render('forgot');
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error_msg', 'No account with that email address exists.');
          return res.redirect('/forgot');
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
        to: user.email,
        from: 'codebreakers8094@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error_msg', 'Password reset token is invalid or has expired. inside get');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error_msg', 'Password reset token is invalid or has expired. inside post');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
              if (err) throw err;
              user.password = hash;
              /* user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined; */
  
              try{
                  await user.save()
                  req.flash(
                    'success_msg',
                    'Password updated successfully'
                  );
                  return res.redirect('/login');
  
              }catch(e){
                  console.log(e)
              }
            });
          });
        } else {
            req.flash("error_msg", "Passwords do not match.");
            return res.redirect('back');
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
        req.flash('success_msg', 'Success! Your password has been changed.');
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
  

router.get('/conformation/:token', function(req, res) {

  User.findOne({ conformationToken: req.params.token, conformationExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error_msg', 'This link has been expired , Please register again !');
      return res.redirect('/login');
    }

    user.varify=true
    console.log(user.varify)
    user.save()
    req.flash('success_msg', 'You are varified , Now you can login!');

    res.render('conformation');
    
  });

})


module.exports = router;
