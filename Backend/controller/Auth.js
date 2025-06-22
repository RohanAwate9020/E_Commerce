const mongoose = require("mongoose");
const model = require("../model/User");
const User = model.User;
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");

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
