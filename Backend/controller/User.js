const mongoose = require("mongoose");
const model = require("../model/User");
const User = model.User;

exports.fetchUserById= async (req,res)=>{
  const {id} =req?.user;
  try{
    const user= await User.findById(id,{password:0,salt:0}).exec();
    res.status(200).json({id:user.id,addresses:user.addresses,email:user.email,role:user.role,name:user.name});
  }catch(err){
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    })
  }
}


exports.updateUser= async (req,res)=>{
  const {id} =req.user;
  try{
    const user= await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password -salt').exec();
    res.status(200).json(user);
  }catch(err){
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    })
  }
}
