const mongoose = require("mongoose");
const model = require("../model/User");
const User = model.User;

exports.fetchUserById= async (req,res)=>{
  const {id} =req?.user;
  console.log("fetchUserById id", id);
  try{
    const user= await User.findById(id).exec();
    delete user.password;
    delete user.salt;
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
