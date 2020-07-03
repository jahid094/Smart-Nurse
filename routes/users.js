const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const moment = require('moment')
const passport = require('passport');
// const sharp = require('sharp')
const jwt = require('jsonwebtoken')
const async = require('async');
const User = require('../models/User');
const { sendWelcomeEmail , sendCancelationEmail , sendResetEmail} =require('../emails/account')

const multer = require('multer')
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req , file , cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new Error('Please upload a picture.'))
    }
    cb(undefined , true)
  }
})

router.get('/getUser/:id' , async (req , res ) =>{
    try{
      const user = await User.findById(req.params.id)
      if(!user){
          return res.status(404).send()
      }
      res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

// Registration 
router.post('/register', (req, res) => {
  const {firstname, lastname, gender, age, email, password, password2, phone, height, weight, userType} = req.body
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
      newUser = new User({firstname, lastname, gender, age, email, password, phone, height, weight, userType})

      const Token = jwt.sign({ firstname , lastname , email } , process.env.JWT_SECRET)
      newUser.conformationToken = Token
      newUser.conformationExpires = Date.now() + 3600000

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) {
            throw err
          } 
          newUser.password = hash;
            try{
                await newUser.save()
                sendWelcomeEmail(req.body.email , Token)

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
        // console.log(user._id)
        // userId  = user._id
        const Token = jwt.sign({ firstname: user.firstname , lastname:user.lastname , email:user.email } , process.env.JWT_SECRET)
        user.cookieToken = Token
        //const user = User.findOne({email: req.body.email})
        //userId  = user._id
        //console.log(user._id)
        user.save()
        return res.status(200).json({
          user,
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

router.get('/userListExcludingMyself/:id' , async (req , res) => {
    let owner = req.params.id
    /* if(req.user){
        owner = req.user._id
    } else {
        owner = req.params.id
    } */
    if(owner === undefined){
      return res.status(404).json({
        message: 'You must logged in'
      })
    }
    const users = await User.find({})
    if(!users){
      return res.status(404).json({
        message: 'No users'
      })
    }
    const userMap = users.filter(function(item) {
      return JSON.stringify(item._id) !== JSON.stringify(owner)
    })
    return res.status(200).json({
      user: userMap
    })
})

// Logout
router.post('/logout', (req, res) => {
  const {id} = req.body
  let userId = id || req.user._id
  if(req.user){
    userId = req.user._id
  } else {
    userId = id
  }
  User.findOne({_id: userId}).then((user) =>{
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
      sendResetEmail(email , token)
      return res.status(200).json({
        token,
        message: 'An e-mail has been sent to ' + email + ' with further instructions.'
      })
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

router.get('/users/:id', async (req, res) => {
  let userId = req.params.id
  try {
    const user = await  User.findOne({_id: userId}).exec()
    if(!user){
      return res.status(400).json({
        message: "User not found"
      })
    }
    if(user.profilePicture){
      const buffer = Buffer.from(user.profilePicture, 'binary').toString('base64');
      const base64data = Buffer.from(buffer, 'base64');
      return res.status(200).json({
        profilePicture: base64data.toString(),
        user
      })
    }
    return res.status(200).json({
      user
    })
  } catch (error) {
    console.log(error)
  }
})

router.patch('/users/profilePicture/:id' , upload.single('updatepp') , async(req,res) => {
  const buffer = Buffer.from(req.file.buffer, 'binary').toString('base64');

  let userId = req.params.id
  
  const user = await User.findOne({_id: userId}).exec()
  if(!user){
    return res.status(400).json({
      message: "User not found"
    })
  }
  user.profilePicture = buffer
  await user.save() 
  res.status(200).json({ 
    message: 'Profile Picture Successfully uploaded'
  })
} , (error , req , res , next ) => {
  res.status(400).json({ 
    message: error.message
  })
})

router.delete('/users/profilePicture/:id' ,  async(req,res) => {
  let userId = req.params.id
  
  const user = await User.findOne({_id: userId}).exec()
  if(!user){
    return res.status(400).json({
      message: "User not found"
    })
  }
  user.profilePicture = undefined
  await user.save()
  res.send({ message: 'Your profile picure has been successfully deleted'})
})

router.patch('/users/me/:id',  async ( req , res) => {
  let userId = req.params.id
  
  const updates = Object.keys(req.body)
  const allowedupdates = ['firstname', 'lastname' , 'age' , 'weight' , 'height' , 'phone']
  const isValidOperation = updates.every((update) => allowedupdates.includes(update))
  const {password, newPassword, confirmPassword} = req.body

  if(!password && !newPassword && !confirmPassword)
  {
    User.findOne({_id: userId}).then((user) =>{
      updates.forEach((update) => user[update] = req.body[update])
      user.save().then(() => {
        return res.status(200).json({
          message: 'Successfully updated'
        })
      }).catch((error) => {
        return res.status(400).json({
          message: error
        })
      })
    }).catch((error) => {
      return res.status(400).json({
        message: error
      })
    })
  }
  else if(password && (!newPassword || !confirmPassword)){
    return res.status(400).json({
      message: 'Please enter your new password for update password!'
    }) 
  } else {
    User.findOne({_id: userId}).then((user) =>{
      bcrypt.compare(password, user.password, (err, data) => {
        if (err){
          throw err
        } 
        if (data) {
          if(newPassword === confirmPassword) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newPassword, salt, async (err, hash) => {
                if (err){
                  throw err;
                } 
                // user.password = hash;
                try{
                    updates.forEach((update) => user[update] = req.body[update])
                    user.password = hash;
                    await user.save()
                    return res.status(200).json({
                      message: 'Profile updated successfully.'
                    })
                }catch(e){
                  return res.status(400).json({
                    message: 'Profile can not update successfully.'
                  })
                }
              })
            })
          } else {
            return res.status(400).json({
              message: 'Passwords do not match.'
            })
          }
        } else {
          return res.status(400).json({
            message: 'Current Password is not correct.'
          })
        }
      })
    }).catch((error) => {
      return res.status(400).json({
        message: "error 3"+error
      })
    })
  }
})

module.exports = router;