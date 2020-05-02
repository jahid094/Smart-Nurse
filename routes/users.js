const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const moment = require('moment')
const passport = require('passport');
const jwt = require('jsonwebtoken')
var async = require('async');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection")
const sharp = require('sharp')
const User = require('../models/User');
const fs = require('fs')

const multer = require('multer')
const upload = multer({
  limits: {
    fileSize: 1000000
  },

  fileFilter(req , file , cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new Error('please upload a picture !'))
    }
    cb(undefined , true)

}
})

const pass = require('../config/keys').GMAILPW;

// Registration 
router.post('/register', (req, res) => {
  const {firstname, lastname, gender, age, email, password, password2, phone, height, weight, userType , profilePicture} = req.body
  let newUser
  
  if (password != password2) {
    return res.status(400).json({
      message: 'Passwords do not match'
    }) 
  }

  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({
        message: 'Email already exists'
      })
    } else {
      newUser = new User({firstname, lastname, gender, age, email, password, phone, height, weight, userType , profilePicture})

      const Token = jwt.sign({ firstname , lastname , email } , process.env.JWT_SECRET)
      newUser.conformationToken = Token
      newUser.conformationExpires = Date.now() + 3600000
      // newUser.profilePicture = fs.readFileSync(require('../images/9deeb84acbf43a4dc7c26a982820a3ea'));

      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'codebreakers8094@gmail.com',
          pass: pass
        }
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) {
            throw err
          } 
          newUser.password = hash;
            try{
                await newUser.save()
                var mailOptions = {
                  to: req.body.email,
                  from: 'codebreakers8094@gmail.com',
                  subject: 'Confirm Your mail',
                  text: 'You are receiving this because you (or someone else) have requested to create account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    process.env.FRONTEND_URL+'confirmation/' + Token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                });
                return res.status(201).json({
                  newUser,
                  message: 'An verification-mail has been sent to ' + newUser.email + ' . Please verify !'
                })
            }catch(error){
                return res.status(400).json({
                  message: error
                })
            }
          })
        })
      }
  })
})

router.patch('/users/profilePicture' , upload.single('updatepp') , async(req,res) => {
  const buffer = await sharp(req.file.buffer).png().toBuffer()
  req.user.profilePicture = buffer
  await req.user.save()
  res.send({ message: 'successfully uploaded'})
} , (error , req , res , next ) => {
  res.status(400).send({ error: error.message})
})

router.patch('/users/me' ,  async ( req , res) => {
  //const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedupdates = ['firstname', 'lastname' , 'age' , 'weight' , 'height' , 'address' ,'profilePicture' ]
  const isValidOperation = updates.every((update) => allowedupdates.includes(update))
  const {password, newPassword, confirmPassword} = req.body

  userPassword =req.user.password;

  if(!password || !newPassword || !confirmPassword)
  {
    return res.status(400).json({
      message: 'please fill neccessary fields ! '
    }) 
  }

  password = await bcrypt.hash(password , 10)

  if(userPassword === password)
  {
      if(newPassword === confirmPassword) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, async (err, hash) => {
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
      }
  }

  // if (newPassword != confirmPassword) {
  //   return res.status(400).json({
  //     message: 'Passwords do not match'
  //   }) 
  // }


  if(!isValidOperation){
      return res.status(400).send({ error: 'Invali updates!'})
  }

  try{
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      //const user = await User.findByIdAndUpdate(req.params.id, req.body , { new : true , runValidators: true })

      res.send(req.user)
  }catch(e){
      res.status(400).send(e)
  }

})

router.post('/users/profilePicture' , upload.single('pp') , async(req,res) => {
  const buffer = await sharp(req.file.buffer).png().toBuffer()
  req.user.profilePicture = buffer
  await req.user.save()
  res.send({ message: 'successfully uploaded'})
} , (error , req , res , next ) => {
  res.status(400).send({ error: error.message})
})

router.delete('/users/profilePicture' ,  async(req,res) => {
  req.user.profilePicture = undefined
  await req.user.save()
  res.send({ message: 'successfully deleted'})
})


router.get('/users/:id/profilePicture' , async(req,res) =>{
  try{

      const user = await User.findById(req.params.id)
      if(!user || !user.profilePicture) {
          throw new Error()
      }

      user.set('Content-Type' , 'image/png')
      res.send(user.profilePicture)
  }catch(e) {
      res.status(404).send()
  }
})

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local' ,(err, user, info) => {
    const {email, password} = req.body
    if (err) { 
      // return next(err);
      return res.status(400).json({
        message: err
      })
    }
    if(!user){
      return res.status(400).json({
        message: 'Invalid credentials, could not log you in'
      })
    }
    if(user.varify !== true){
      return res.status(400).json({
        message: 'Please verify your email to login.'
      })
    }
    let isValidPassword = false
    if(user.varify === true){
      isValidPassword =  bcrypt.compare(password, user.password).then(() => {
        isValidPassword = true
      }).catch((error) => {
        return res.status(400).json({
          message: 'Could not log you in, please check your credentials and try again.'
        })
      })
    }
    if(isValidPassword){
      req.logIn(user, function(err) {
        if (err) { 
          return res.status(400).json({
            message: err

          }) 
        }
        console.log(user._id)
        userId  = user._id
        const Token = jwt.sign({ firstname: user.firstname , lastname:user.lastname , email:user.email } , process.env.JWT_SECRET)
        user.cookieToken = Token
        //const user = User.findOne({email: req.body.email})
        //userId  = user._id
        //console.log(user._id)
        user.save()
        var base64data = Buffer.from(user.profilePicture, 'binary').toString('base64');
        // var originaldata = Buffer.from(base64data, 'base64');

        return res.status(200).json({
          profilePicture: base64data,
          Token,
          message: 'Logged in'
        })
      })
    } else{
      return res.status(400).json({
        message: 'Invalid credentials, could not log you in.'
      })
    }
  })(req, res, next)
})

// Logout
router.post('/logout', (req, res) => {
  const {id} = req.body
  User.findOne({_id: id}).then((user) =>{
    user.cookieToken = undefined
    user.save().then(() => {}).catch((error) => {
      return res.status(400).json({
        message: error
      })
    })
  }).catch((error) => {
    return res.status(400).json({
      message: error
    })
  })
  req.logout();
  return res.status(200).json({
    message: 'You are logged out.'
  })
});

//Verify Cookie
router.post('/verifyCookie', (req, res) => {
  const {token} = req.body
  User.findOne({cookieToken: token}).then((user) =>{
    if(!user){
      return res.status(400).json({
        message: 'Cookie not Exist'
      })
    }
    return res.status(200).json({
      message: 'Cookie Exist'
    })
  }).catch((error) => {
    return res.status(400).json({
      message: error
    })
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
          process.env.FRONTEND_URL+'resetPassword/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, 'done');

        if (err) {
          return res.status(400).send(err);
        }

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
        done(err);
      });
    }
  ], function(err) {
  });
});


router.get('/reset/:token', function(req, res) {
  User.findOne({ 
    resetPasswordToken: req.params.token, 
    resetPasswordExpires: { $gt: Date.now() } 
  }, (err, user) => {
    if (!user) {
      return res.status(400).json({
        message: 'This link has been expired'
      })
    }
    return res.status(200).json({
      message: 'You can update password with this link!'
    })  
  });
})

User.find({varify: false }).then((user) =>{
  user.forEach((element) => {
    var expire = moment(new Date()).isSameOrBefore(element.conformationExpires)
    if(!expire){
      User.deleteOne(element).then((user) =>{}).catch((e) =>{
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
