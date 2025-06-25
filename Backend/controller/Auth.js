const mongoose = require("mongoose");
const model = require("../model/User");
const User = model.User;
const crypto = require("crypto");
const { sanitizeUser, sendEmail } = require("../services/common");
const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");
const e = require("express");

exports.createUser = async (req, res) => {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({
          ...req.body,
          password: hashedPassword,
          salt: salt,
        });
        const doc = await user.save();
        req.login(sanitizeUser(doc), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            // const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            const token = jwt.sign(
              { sub: doc._id, role: doc.role },
              SECRET_KEY
            );
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 90000),
                httpOnly: true,
              })
              .status(201)
              .json(token);
          }
        });
      }
    );
    z;
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 9000000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};
exports.checkAuth = async (req, res) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();
    const resetPageLink =
      "http://localhost:5173/reset-password?token=" + token + "&email=" + email;
    const subject = "reset password for E-commerce";
    const text = `Click the link to reset your password: ${resetPageLink}`;
    const html = `<a href="${resetPageLink}">Click here to reset your password</a>`;

    if (req.body.email) {
      const response = await sendEmail({
        to: email,
        subject,
        text,
        html,
      });
      return res.json(response);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(400).send("Bad Request");
  }
};

exports.resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  const user = await User.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        user.resetPasswordToken = ""; // Clear the reset token after use
        const doc = await user.save();
        if (doc) {
          res.status(200).json({ message: "Password reset successfully" });
        } else {
          res.status(500).json({ message: "Error resetting password" });
        }
      }
    );
  } else {
    res.status(400).send("Bad Request");
  }
};
