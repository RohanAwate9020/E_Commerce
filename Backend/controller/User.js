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

exports.fetchUserById= async (req,res)=>{
  const userId =req.params.id;
  try{
    const user= await User.findById(userId, "name email id").exec();
    res.status(200).json(user);
  }catch(err){
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    })
  }
}


exports.updateUser= async (req,res)=>{
  const userId =req.params.id;
  try{
    const user= await User.findByIdAndUpdate(userId, req.body, { new: true }).exec();
    res.status(200).json(user);
  }catch(err){
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    })
  }
}
