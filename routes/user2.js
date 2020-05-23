const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const passport = require("passport");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const async = require("async");
const User = require("../models/User");
const { sendRequestEmail } = require("../emails/account");

router.post("/users/patientRegister", async (req, res) => {
  const {
    firstname,
    lastname,
    gender,
    age,
    email,
    phone,
    height,
    weight,
  } = req.body;
  let newUser;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
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
          message:
            "An verification-mail has been sent to " +
            newUser.email +
            " . Please verify !",
        });
      } catch (error) {
        return res.status(400).json({
          message: error,
        });
      }
    }
  });
});

User.find({ varify: false }).then((user) => {
  user.forEach((element) => {
    var expire = moment(new Date()).isSameOrBefore(element.conformationExpires);
    if (!expire) {
      User.deleteOne(element)
        .then((user) => {})
        .catch((e) => {
          console.log(e);
        });
    }
  });
});

router.post("/conformation/request/:token", (req, res) => {
  const { password, confirm } = req.body;
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            conformationToken: req.params.token,
            conformationExpires: { $gt: Date.now() },
          },
          (err, user) => {
            if (!user) {
              return res.status(400).json({
                message: "Password reset token is invalid or has expired.",
              });
            }
            user.varify = true;
            if (password === confirm) {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                  if (err) throw err;
                  user.password = hash;
                  try {
                    await user.save();
                    return res.status(200).json({
                      message: "Password added successfully.",
                    });
                  } catch (e) {
                    return res.status(400).json({
                      message: e,
                    });
                  }
                });
              });
            } else {
              return res.status(400).json({
                message: "Passwords do not match.",
              });
            }
          }
        );
      },
    ],
    function (err) {}
  );
});

module.exports = router;
