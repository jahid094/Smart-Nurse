const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const async = require("async");
const User = require("../models/User");
const { sendRequestEmail } = require("../emails/account");
const { use } = require("passport");

router.post("/users/patientRegister", async (req, res) => {
  const {firstname, lastname, gender, age,email, phone, height, weight, guardianId} = req.body;
  let newUser;

  const guardian = await User.findOne({
    _id: guardianId
  })

  if(guardian.guardianList.length > 0){
    return res.status(404).json({
      message: 'You already have a guradian.'
    })
  }

  if(guardian.patientList.length > 0){
    return res.status(404).json({
      message: 'You are already a patient of a user.'
    })
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: "Email already exists"
      });
    } else {
      
      newUser = new User({
        firstname,
        lastname,
        gender,
        age,
        email,
        phone,
        height,
        weight,
        guardianList: {
          guardianId,
          guardianName: guardian.firstname+' '+guardian.lastname
        }
      });

      const Token = jwt.sign(
        { firstname, lastname, email },
        process.env.JWT_SECRET
      );
      newUser.userType = "patient";
      newUser.conformationToken = Token;
      newUser.conformationExpires = Date.now() + 3600000;

      try {
        newUser.save();
        sendRequestEmail(req.body.email, Token);

        return res.status(201).json({
          newUser,
          message: "An verification-mail has been sent to " +newUser.email +". Please verify!",
        });
      } catch (error) {
        return res.status(400).json({
          message: error
        });
      }
    }
  });
});

router.post("/conformation/request/:token", (req, res) => {
  const { password, confirm } = req.body;
  async.waterfall(
    [
      function (done) {
        User.findOne({
            conformationToken: req.params.token,
            conformationExpires: { $gt: Date.now() }
          },
          (err, user) => {
            if (!user) {
              return res.status(400).json({
                message: "Password set token for your account is invalid or has expired."
              });
            }
            user.varify = true;
            if (password === confirm) {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                  if (err) throw err;
                  user.password = hash;
                  const guardian = await User.findOne({
                    _id: user.guardianList[0].guardianId
                  })
                  try {
                    guardian.patientList = [{
                      patientId: user._id,
                      patientName: user.firstname+' '+user.lastname
                    }]
                    await guardian.save();
                    await user.save();
                    return res.status(200).json({
                      message: "Password added successfully to your account. You can now login into your account"
                    });
                  } catch (e) {
                    return res.status(400).json({
                      message: e
                    });
                  }
                });
              });
            } else {
              return res.status(400).json({
                message: "Passwords do not match."
              });
            }
          }
        );
      },
    ],
    function (err) {}
  );
});

router.get('/conformation/request/:token', function(req, res) {
  User.findOne({ 
    conformationToken: req.params.token, 
    conformationExpires: { $gt: Date.now() } 
  }, (err, user) => {
    if (!user) {
      return res.status(400).json({
        message: 'This link has been expired'
      })
    }
    return res.status(200).json({
      message: 'You can set password with this link!'
    })  
  });
})

module.exports = router;