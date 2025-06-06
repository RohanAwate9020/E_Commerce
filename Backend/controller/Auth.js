const mongoose = require("mongoose");
const model = require("../model/User");
const User = model.User;

exports.createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const doc = await user.save();
    res.status(201).json({
      id:doc.id,
      role:doc.role,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    console.log(user);
    if(!user) {
      return res.status(404).json({
        message: "No user found with this email",
      });
    }
    else if (user.password === req.body.password) {
      return res.status(200).json({id:user.id, role:user.role});
    }
    else{
    res.status(401).json({
      message: "Password does not match",
    });}
  } catch (err) {
    res.status(500).json({
      message: "No user found with this email",
      error: err.message,
    });
  }
};
