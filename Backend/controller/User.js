const mongoose = require("mongoose");
const model = require("../model/User");
const User = model.User;
const {  sendEmail, sendEmailtoUser } = require("../services/common");

exports.fetchUserById = async (req, res) => {
  const { id } = req?.user;
  try {
    const user = await User.findById(id, { password: 0, salt: 0 }).exec();
    res.status(200).json({
      id: user.id,
      addresses: user.addresses,
      email: user.email,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    });
  }
};

exports.fetchUsers = async (req, res) => {
  try {
    let query = User.find({ role: "user" }); // No .exec() yet

    // If productName filter is provided
    if (req.query.userName) {
      const nameRegex = new RegExp(req.query.userName, "i");
      query = query.find({ name: nameRegex }); // chain filters
    }

    // Pagination
    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query = query.skip((page - 1) * pageSize).limit(pageSize);
    }

    // Execute query
    const docs = await query.exec();

    // Count total users (without pagination)
    const totalUsers = await User.countDocuments({ role: "user" });

    res.set("X-Total-Count", totalUsers);
    res.status(200).json(docs);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      message: "Error fetching users",
      error: err.message,
    });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true })
      .select("-password -salt")
      .exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching product",
      error: err,
    });
  }
};

exports.emailAdminToUser = async (req, res) => {
  const { userEmail,subject,message } = req.body;
  console.log("got email");
  console.log("Sending email to:", userEmail, "Subject:", subject, "Message:", message);
  const response = await sendEmailtoUser({
          to: userEmail,
          subject: subject,
          text: message,
        });
        return res.json(response);
};
