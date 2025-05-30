const mongoose = require("mongoose");
const model = require("../model/User");
const User = model.User;



exports.fetchUserById= async (req,res)=>{
  const userId =req.params.id;
  try{
    const user= await User.findById(userId, "name email id addresses").exec();
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
