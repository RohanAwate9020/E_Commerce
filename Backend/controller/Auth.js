const mongoose = require("mongoose");
const model = require("../model/User");
const User = model.User;

exports.createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const doc = await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: doc,
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
      return res.status(200).json({name:user.name , email:user.email, id:user.id, addresses:user.addresses,role:user.role});
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
